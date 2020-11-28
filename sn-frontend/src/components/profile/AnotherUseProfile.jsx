/*
Tente achar um nome melhor para esse componente.
*/
import './Profile.css'
import pictureDefault from '../../assets/profile_default.png'
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { baseApiUrl, notify } from '../../global'
import { saveUser } from '../../redux/actions'

class AnotherUserProfile extends Component {

    state = {
        id: this.props.id,
        name: this.props.name,
        bio: this.props.bio,
        profilePicture: this.props.profilePicture,
        small: this.props.small
    }

    constructor(props) {
        super(props)
        this.addFriend = this.addFriend.bind(this)
        this.removeFriend = this.removeFriend.bind(this)
    }

    addFriend() {
        axios.post(`${baseApiUrl}/users/${this.props.user.id}/friends`, { friendId: this.state.id })
            .then(_ => {
                const friends = this.props.user.friends
                friends[this.state.id] = this.state.id
                this.props.dispatch(saveUser({ ...this.props.user, friends }))
                notify()
            })
            .catch(err => notify(err, 'error'))
    }

    removeFriend() {
        axios.put(`${baseApiUrl}/users/${this.props.user.id}/friends`, { friendId: this.state.id })
            .then(_ => {
                const friends = { ...JSON.parse(this.props.user.friends) }
                const friend = this.state.id

                delete friends[friend]
                
                this.props.dispatch(saveUser({ ...this.props.user, friends }))

                this.props.remove && this.props.remove()
                //faça uma animação para remover
                //cuide do design
                notify()
            })
            .catch(err => notify(err, 'error'))
    }

    render() {
        return (
            <div className={this.state.small ? 'user-small' : 'user'} >
                <div className={this.state.small ? '' : 'profile-picture'}>
                    <div className={this.state.small ? 'image-container-small' : 'image-container'}>
                        {this.state.profilePicture ?
                            <img className={this.state.small ? 'image-small' : 'image'} src={this.state.profilePicture}
                                alt="profile_picture" height='180' /> :
                            <img className={this.state.small ? 'image-small' : 'image'} src={pictureDefault}
                                alt="profile_picture" height='180' />}
                    </div>
                </div>
                        { this.state.small ? <Link to={{ pathname: '/user', state: { ...this.state }}}>{this.state.name}</Link> :
                <div className={this.state.small ? 'name-small' : 'name'}>{this.state.name}</div>}
                { this.props.user.friends[this.state.id] ?
                    <button className="friends-button btn btn-danger" onClick={this.removeFriend}>Remove friend</button> :
                    <button className="friends-button btn btn-primary" onClick={this.addFriend} >Add friend</button>
                }
                <div className={this.state.small ? 'bio-small' : 'bio'}>
                    <textarea maxLength="500" disabled={true} className={this.state.small ? 'bio-text-small' : 'bio-text'} value={this.state.bio || ''} placeholder='Bio' />
                </div>
            </div>
        )//arrumar o estilo, deixar tudo responsivo, mesmo no celular, e implementar os métodos
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(AnotherUserProfile)