import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveUser } from '../../redux/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as thumbsUpSolid } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as thumbsUpRegular } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { baseApiUrl, notify } from '../../global'
import pictureDefault from '../../assets/profile_default.png'
import Comments from '../comments/Comments'

const initialState = {
    user: null,
    likes: 0,
    liked: false,
    showComments: false
}

class Post extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.getUserData = this.getUserData.bind(this)
        this.like = this.like.bind(this)
        this.altShowComments = this.altShowComments.bind(this)
        this.checkIfLiked = this.checkIfLiked.bind(this)
    }

    like() {
        const addOrRemove = this.state.liked ? 'remove' : 'add'
        axios.put(`${baseApiUrl}/posts/post/like/${this.props.id}/${addOrRemove}/${this.props.user.id}`)
            .then(_ => {
                const likedPosts = this.props.user.likedPosts
                if (this.state.liked) {
                    delete likedPosts[this.props.id]
                    this.setState({ liked: false })
                    this.setState({ likes: this.state.likes - 1 })
                } else {
                    likedPosts[this.props.id] = this.props.id
                    this.setState({ liked: true })
                    this.setState({ likes: this.state.likes + 1 })
                }
                this.props.dispatch(saveUser({ ...this.props.user, likedPosts }))
            })
            .catch(err => notify(err, 'error'))
        //faça o componente de comments
    }

    getUserData() {
        axios.get(`${baseApiUrl}/users/${this.props.userId}`)
            .then(res => this.setState({ user: res.data }))
            .catch(err => notify(err, 'error'))
    }

    altShowComments() {
        this.setState({ showComments: !this.state.showComments })
    }

    checkIfLiked() {
        const likedPosts =  this.props.user.likedPosts
        const liked = likedPosts[this.props.id] ? true : false
        this.setState({ liked })
    }

    componentDidMount() {
        this.getUserData()
        this.checkIfLiked()
        this.setState({ likes: this.props.likes })
    }

    render() {
        return (
            <div className="post">
                <div className="profile-picture">
                    {this.state.user && this.state.user.profilePicture ?
                        <img src={this.state.user.profilePicture} alt="profile" /> :
                        <img src={pictureDefault} alt="profile" />}
                </div>
                <div className="aside">
                    {this.state.user && <Link className="name" to={
                        this.state.user.id === this.props.user.id ? '/profile' : {
                            pathname: '/user',
                            state: { ...this.state.user, small: false }
                        }}>{this.state.user.name}</Link>}
                    <div className="date">{this.props.date}</div>
                    <div className="interactions">
                        <div className="likes-container">
                            <div className="likes">
                                {this.state.likes}
                            </div>
                            <button className='like-button' onClick={this.like} >
                                <FontAwesomeIcon icon={this.state.liked ? thumbsUpSolid : thumbsUpRegular} size='lg' />
                            </button>
                        </div>
                        <button className="open-comments" onClick={this.altShowComments} >Comments</button>
                    </div>
                </div>
                <div className="main">
                    <div className="text">
                        {this.props.text}
                    </div>
                    <div className="image-container">
                        {this.props.image && <img src={this.props.image} alt="post" className="image" />}
                    </div>
                </div>
                { this.state.showComments && <Comments close={this.altShowComments} />}
            </div>
        )
    }//tentar usar as bibliotecas do bootstrap ao invés do link no index.html, se não for usar, remover as dependências
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Post)