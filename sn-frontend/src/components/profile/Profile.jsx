import './Profile.css'
import pictureDefault from '../../assets/profile_default.png'

import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faSave, faEdit } from '@fortawesome/free-solid-svg-icons'

import { baseApiUrl, notify } from '../../global'
import { saveUser } from '../../redux/actions'

import { handleImage } from '../../utils/imageHandler'

const initialState = {
    image: null,
    changingBio: false
}

class Profile extends Component {
    state = { ...initialState }

    constructor(props) {
        super(props)
        this.selectPicture = this.selectPicture.bind(this)
        //this.getDataUrl = this.getDataUrl.bind(this)
        //this.uploadPicture = this.uploadPicture.bind(this)
        this.saveBio = this.saveBio.bind(this)
        this.changeBio = this.changeBio.bind(this)
    }

    async selectPicture(event) {
        /*const PictureBinary = await this.getData(event.target.files[0])
        this.setState({ image: PictureBinary })
        this.uploadPicture()*/
        await handleImage(event.target.files[0], `${baseApiUrl}/users/${this.props.user.id}/picture`)
    }

    /*getData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.addEventListener('load', () => {
                resolve(reader.result)
            })
            reader.addEventListener('error', err => reject(err))

            reader.readAsDataURL(file)
        })
    }*/

    /*uploadPicture() {
        //.match(/.{1,10000}/g)
        const pic = { 'image': this.state.image }
        axios.post(`${baseApiUrl}/users/${this.props.user.id}/picture`, pic)
            .then(_ => {
                notify('Image uploaded')
                const user = { ...this.props.user }
                user.profilePicture = this.state.image
                this.props.dispatch(saveUser(user))
            })
            .catch(err => notify(err, 'error'))
            //dê um jeito de fazer todas as requisições em chunks
            //talvez seja melhor fazer o componente de posts e só depois cuidar das imagens
            //procure uma api de redução do tamanho das imagens
    }*/

    saveBio() {
        const bio = document.getElementById('bio')

        axios.post(`${baseApiUrl}/users/${this.props.user.id}/bio`, { bio: bio.value })
            .then(_ => notify('Bio updated'))
            .catch(err => notify(err, 'error'))
        const user = { ...this.props.user }
        user.bio = bio.value
        this.props.dispatch(saveUser(user))

        this.setState({ changingBio: false })
    }

    changeBio() {
        this.setState({ changingBio: true })
    }

    render() {
        const user = this.props.user
        return (
            <div className="profile">
                <div className="profile-picture">
                    <button className="img-button" alt="change profile picture" onClick={() => this.imageInput.click()}><FontAwesomeIcon icon={faCamera} /></button>
                    {this.props.user.profilePicture ?
                        <img className="image" src={this.props.user.profilePicture}
                            alt="profile_picture" height='130' /> :
                        <img className="image" src={pictureDefault}
                            alt="profile_picture" height='130' />}
                    <input type="file" className="input-file" onChange={this.selectPicture}
                        ref={imageInput => this.imageInput = imageInput} />
                </div>
                <div className="name">{user.name}</div>
                <div className="your-posts">Yours posts</div>
                <div className="bio">
                    {this.state.changingBio ?
                        <button className="bio-button" alt="save bio" onClick={this.saveBio} ><FontAwesomeIcon icon={faSave} /></button> :
                        <button className="bio-button" alt="edit bio" onClick={this.changeBio} ><FontAwesomeIcon icon={faEdit} /></button>
                    }
                    <textarea type="text" id="bio" disabled={this.state.changingBio ? false : true} className="bio-text" defaultValue={this.props.user.bio || 'Your bio'} />
                </div>
                <div className="friends">Your friends</div>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Profile)

//router link no your post passando informações para o componente posts mostrar apenas os do usuário
//deve ser possível visualizar os amigos, cancelar a amizade, entrar no perfil, e mandar mensagem
//pegue a imagem de perfil do db
//tente deixar o design mais responsivo