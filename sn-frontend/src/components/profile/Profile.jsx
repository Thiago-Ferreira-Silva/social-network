import './Profile.css'
import pictureDefault from '../../assets/profile_default.png'
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faSave, faEdit } from '@fortawesome/free-solid-svg-icons'
import { baseApiUrl, notify } from '../../global'
import { saveUser } from '../../redux/actions'
import { resizeImage } from '../../utils/imageHandler'
import { Link } from 'react-router-dom'
import Loading from '../template/Loading'
import AnotherUserProfile from './AnotherUserProfile'

const initialState = {
    changingBio: false,
    loadingProfilePicture: false,
    loadingFriends: false,
    friends: null,
    bio: null
}

class Profile extends Component {
    state = { ...initialState }

    constructor(props) {
        super(props)
        this.selectPicture = this.selectPicture.bind(this)
        this.saveBio = this.saveBio.bind(this)
        this.changeBio = this.changeBio.bind(this)
        this.uploadPicture = this.uploadPicture.bind(this)
        this.updateBio = this.updateBio.bind(this)
        this.getFriends = this.getFriends.bind(this)
    }

    async selectPicture(event) {
        this.setState({ loadingProfilePicture: true })
        await resizeImage(event.target.files[0], 300, 300, 180, 180, this.uploadPicture)
        this.setState({ loadingProfilePicture: false })
    }
    //o componente loading me parece desnecessário

    uploadPicture(image) {
        axios.post(`${baseApiUrl}/users/${this.props.user.id}/picture`, { image })
            .then(_ => {
                const user = { ...this.props.user }
                user.profilePicture = image
                this.props.dispatch(saveUser(user))
                notify('Image uploaded')
            })
            .catch(err => notify(err, 'error'))
    }

    saveBio() {
        axios.post(`${baseApiUrl}/users/${this.props.user.id}/bio`, { bio: this.state.bio })
            .then(_ => notify('Bio updated'))
            .catch(err => notify(err, 'error'))
        const user = { ...this.props.user }
        user.bio = this.state.bio
        this.props.dispatch(saveUser(user))

        this.setState({ changingBio: false })
    }

    changeBio() {
        this.setState({ changingBio: true })
    }

    updateBio(event) {
        this.setState({ bio: event.target.value })
    }

    getFriends() {
        this.setState({ loadingFriends: true })
        axios.get(`${baseApiUrl}/users/${this.props.user.id}/friends`)
            .then(res => {
                const friends = Object.entries(res.data).length === 0 ? null : res.data.map(friend => {
                    return friend ? <AnotherUserProfile id={friend.id} name={friend.name} bio={friend.bio}
                        profilePicture={friend.profilePicture} small={true} remove={this.getFriends} key={friend.id} /> : ''
                })
                this.setState({ friends, loadingFriends: false })
            })
            .catch(err => {
                notify(err, 'error')
                this.setState({ loadingFriends: false })
            })
    }

    componentDidMount() {
        this.getFriends()
        this.setState({ bio: this.props.user.bio })
    }

    render() {
        const user = this.props.user
        return (
            <div className="user-container">
                <div className="user">
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
                    <div className="your-posts"><Link to='/your-posts'>Yours posts</Link></div>
                    <div className="bio">
                        {this.state.changingBio ?
                            <button className="bio-button" alt="save bio" onClick={this.saveBio} ><FontAwesomeIcon icon={faSave} /></button> :
                            <button className="bio-button" alt="edit bio" onClick={this.changeBio} ><FontAwesomeIcon icon={faEdit} /></button>
                        }
                        <textarea maxLength="500" id="bio" disabled={this.state.changingBio ? false : true} className="bio-text" value={this.state.bio || ''} onChange={this.updateBio} placeholder='Your bio' />
                    </div>
                </div>
                {this.state.loadingFriends ? <Loading /> :
                    <div className="friends">{this.state.friends || <div>Your friends</div>}</div>
                }
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Profile)