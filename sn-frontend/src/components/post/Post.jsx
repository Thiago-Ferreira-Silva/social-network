// se clicar em comentários aparecem em popup e podem ser fechados
//estude a adição de like e unlike nos posts e comentários, e também a adição de vídeos
import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    liked: false, //essa informação provavelmente não vai ficar aqui, talvez em user na store
    showComments: false
}

class Post extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.getUserData = this.getUserData.bind(this)
        this.like = this.like.bind(this)
        this.altShowComments = this.altShowComments.bind(this)
    }

    like() {
        const addOrRemove = this.state.liked ? 'remove' : 'add'
        axios.put(`${baseApiUrl}/posts/post/like/${this.props.id}/${addOrRemove}`)
            .then(_ => {
                this.state.liked ?
                    this.setState({ likes: this.state.likes - 1 }) :
                    this.setState({ likes: this.state.likes + 1 })
                this.setState({ liked: !this.state.liked })
            })
            .catch(err => notify(err, 'error'))
        //termine isso armazenando o liked em um local adequado
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

    componentDidMount() {
        this.getUserData()
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
        )// deve ter o nome e a foto de perfil de quem fez o post, podendo ir para o perfil da pessoa
    }//tentar usar as bibliotecas do bootstrap ao invés do link no index.html, se não for usar, remover as dependências
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Post)