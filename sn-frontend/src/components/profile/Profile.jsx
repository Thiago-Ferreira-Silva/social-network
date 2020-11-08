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
import Loading from '../template/Loading'

const initialState = {
    changingBio: false,
    loadingProfilePicture: false
}

class Profile extends Component {
    state = { ...initialState }

    constructor(props) {
        super(props)
        this.selectPicture = this.selectPicture.bind(this)
        this.saveBio = this.saveBio.bind(this)
        this.changeBio = this.changeBio.bind(this)
        this.updatePicture = this.updatePicture.bind(this)
    }

    async selectPicture(event) {
        this.setState({ loadingProfilePicture: true })
        await handleImage(event.target.files[0], `${baseApiUrl}/users/${this.props.user.id}/picture`, 300, 300, 180, 180, this.updatePicture)
        this.setState({ loadingProfilePicture: false })
    }

    updatePicture(image) {
        const user = { ...this.props.user }
        user.profilePicture = image
        this.props.dispatch(saveUser(user))
    }

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
                    {this.state.loadingProfilePicture ?
                        <Loading className="loading" /> :
                        <div className="image-container">
                            {this.props.user.profilePicture ?
                                <img className="image" src={this.props.user.profilePicture}
                                    alt="profile_picture" height='180' /> :
                                <img className="image" src={pictureDefault}
                                    alt="profile_picture" height='180' />}
                        </div>}
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
//tente deixar o design mais responsivo