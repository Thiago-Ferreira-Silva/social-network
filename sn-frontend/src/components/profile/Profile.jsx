import './Profile.css'

import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { baseApiUrl } from '../../global'

const initialState = { image: null }

class Profile extends Component {
    state = { ...initialState }

    constructor(props) {
        super(props)
        this.selectPicture = this.selectPicture.bind(this)
        this.getBinaryFromFile = this.getBinaryFromFile.bind(this)
        this.uploadPicture = this.uploadPicture.bind(this)
    }

    async selectPicture (event) {
        const PictureBinary = await this.getBinaryFromFile(event.target.files[0])
        this.setState({ image: PictureBinary })
    }

    getBinaryFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.addEventListener('load', () => {console.log('done')
                resolve(reader.result)})
            reader.addEventListener('error', err => reject(err))

            reader.readAsDataURL(file)
        })
    }

    uploadPicture() {
        const pic = { 'image': this.state.image }
        axios.post(`${baseApiUrl}/users/${this.props.user.id}/picture`, pic )
    }

    render () {
        const user = this.props.user
        return (
            <div className="profile">
                <div className="profile-picture">
                    <img src={require('../../assets/profile_default.png')} alt="profile_picture"/>
                </div>
        <div className="name">{ user.name }</div>
                <div className="your-posts">Yours posts</div>
                <div className="bio">Bio</div>
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

//adicione bio à tabela users, e talvez uma friends também, a não ser que tenha uma forma mais adequada;
//a foto de perfil e a bio podem ser editados; a bio pode ser no componente profile, mas a foto é em um 
//componente separado; deve ser possível visualizar os amigos, cancelar a amizade, entrar no perfil, e mandar mensagem