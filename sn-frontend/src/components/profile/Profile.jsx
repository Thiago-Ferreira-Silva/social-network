import './Profile.css'

import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { baseApiUrl } from '../../global'
import { saveUser } from '../../redux/actions'

const initialState = { image: null }

class Profile extends Component {
    state = { ...initialState }

    constructor(props) {
        super(props)
        this.selectPicture = this.selectPicture.bind(this)
        this.getBinaryFromFile = this.getBinaryFromFile.bind(this)
        this.uploadPicture = this.uploadPicture.bind(this)
        this.saveBio = this.saveBio.bind(this)
    }

    async selectPicture(event) {
        const PictureBinary = await this.getBinaryFromFile(event.target.files[0])
        this.setState({ image: PictureBinary })
    }

    getBinaryFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.addEventListener('load', () => {
                console.log('done')
                resolve(reader.result)
            })
            reader.addEventListener('error', err => reject(err))

            reader.readAsDataURL(file)
        })
    }

    uploadPicture() {
        const pic = { 'image': this.state.image }
        axios.post(`${baseApiUrl}/users/${this.props.user.id}/picture`, pic)
    }

    saveBio() {
        axios.post(`${baseApiUrl}/users/${this.props.user.id}/bio`, { bio: 'Essa é a minha bio' })
        const user = { ...this.props.user }
        user.bio = 'Essa é a minha bio'
        this.props.dispatch(saveUser(user))
    }

    render() {
        const user = this.props.user
        return (
            <div className="profile">
                <div className="profile-picture">
                    <img className="image" src={require('../../assets/profile_default.png')} alt="profile_picture"
                        height='130' />
                </div>
                <div className="name">{user.name}</div>
                <div className="your-posts">Yours posts</div>
                <div className="bio">
                    <div>{this.props.user.bio || 'Your bio'}</div>
                    <button onClick={this.saveBio} >Save bio</button>
                </div>
                <div className="friends">Your friends</div>
            </div>
        )
    }
}

/*
<input type="file" onChange={this.selectPicture}/>
<button onClick={this.uploadPicture}>Upload</button>
*/

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Profile)

//router link no your post passando informações para o componente posts mostrar apenas os do usuário
//a foto de perfil e a bio podem ser editados; a bio pode ser no componente profile, mas a foto é em um 
//componente separado; deve ser possível visualizar os amigos, cancelar a amizade, entrar no perfil, e mandar mensagem
//tente deixar o design mais responsivo