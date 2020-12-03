// se clicar em comentários aparecem em popup e podem ser fechados
//estude a adição de like e unlike nos posts e comentários, e também a adição de vídeos
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { baseApiUrl, notify } from '../../global'

const initialState = {
    username: null,
    profilePicture: null
}

class Post extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.getUserData = this.getUserData.bind(this)
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
                <div className="text">
                    {this.props.text}
                </div>
                <div className="image-container">
                    {this.props.image && <img src={this.props.image} alt="" className="image" />}
                </div>
            </div>
        )// deve ter o nome e a foto de perfil de quem fez o post, podendo ir para o perfil da pessoa, e também a data
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Post)