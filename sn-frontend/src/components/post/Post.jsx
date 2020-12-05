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

const initialState = {
    username: null,
    profilePicture: null,
    liked: false //essa informação provavelmente não vai ficar aqui, talvez em user na store
}

class Post extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.getUserData = this.getUserData.bind(this)
        this.like = this.like.bind(this)
    }

    like() {
        this.setState({ liked: !this.state.liked })
    }

    getUserData() {
        axios.get(`${baseApiUrl}/users/${this.props.userId}/picture`)
            .then(res => this.setState({ username: res.data.name, profilePicture: res.data.picture }))
            .catch(err => notify(err, 'error'))
    }

    componentDidMount() {
        this.getUserData()
    }

    render() {
        return (
            <div className="post">
                <div className="profile-picture">
                    {this.state.profilePicture ?
                        <img src={this.state.profilePicture} alt="profile" /> :
                        <img src={pictureDefault} alt="profile" />}
                </div>
                <div className="aside">
                    <Link className="name" to='/'>{this.state.username}</Link>{/* como passar todas as informações necessárias? */}
                    <div className="date">{this.props.date}</div>
                    <div className="interactions">
                        <div className="likes-container">
                            <div className="likes">
                                {this.props.likes}
                            </div>
                            <button className='like-button' onClick={this.like} >
                                <FontAwesomeIcon icon={this.state.liked ? thumbsUpSolid : thumbsUpRegular} size='lg' />
                            </button>
                        </div>
                        <div className="open-comments">
                            Comments
                    {/* Abrir os comentários em popup, talvez, só talvez, criar um componente para os comentários 
                        talvez colocar um ícone no lugar do texto*/}
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="image-container">
                        {this.props.image && <img src={this.props.image} alt="post" className="image" />}
                    </div>
                    <div className="text">
                        {this.props.text}
                    </div>
                </div>
            </div>
        )// deve ter o nome e a foto de perfil de quem fez o post, podendo ir para o perfil da pessoa, e também a data
    }//tentar usar as bibliotecas do bootstrap ao invés do link no index.html, se não for usar, remover as dependências
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Post)