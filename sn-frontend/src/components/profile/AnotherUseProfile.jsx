/*
Tente achar um nome melhor para esse componente.
*/
import './Profile.css'
import pictureDefault from '../../assets/profile_default.png'
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { baseApiUrl, notify } from '../../global'
import { saveUser } from '../../redux/actions'

class AnotherUserProfile extends Component {

    constructor(props) {
        super(props)
        this.addFriend = this.addFriend.bind(this)
        this.removeFriend = this.removeFriend.bind(this)
        this.goToProfile = this.goToProfile.bind(this)
    }

    addFriend() {
        axios.post(`${baseApiUrl}/users/${this.props.user.id}/friends`, this.props.id)
            .then(_ => {
                const friends = this.props.user.friends
                friends[this.props.id] = this.props.id
                this.props.dispatch(saveUser({ ...this.props.user, friends }))
                notify()
            })
            .catch(err => notify(err, 'error'))
    }

    removeFriend() {
        axios.put(`${baseApiUrl}/users/${this.props.user.id}/friends`, { friendId: this.props.id })
            .then(_ => {
                const friends = this.props.user.friends
                delete friends[this.props.id]
                this.props.dispatch(saveUser({ ...this.props.user, friends }))
                this.props.remove && this.props.remove()
                //a parte do remove não está funcionando; faça uma animação para remover
                //quando small for false os botões de remove a add devem de alternar
                //cuide do design
                notify()
            })
            .catch(err => notify(err, 'error'))
    }

    goToProfile() {
        if (this.props.small) {
            //use o react router dom
        }
    }

    render() {
        return (
            <div className={this.props.small ? 'user-small' : 'user'}>
                <div className={this.props.small ? '' : 'profile-picture'}>
                    <div className={this.props.small ? 'image-container-small' : 'image-container'}>
                        {this.props.profilePicture ?
                            <img className={this.props.small ? 'image-small' : 'image'} src={this.props.profilePicture}
                                alt="profile_picture" height='180' /> :
                            <img className={this.props.small ? 'image-small' : 'image'} src={pictureDefault}
                                alt="profile_picture" height='180' />}
                    </div>
                </div>
                <div className={this.props.small ? 'name-small' : 'name'} onClick={this.goToProfile} >{this.props.name}</div>
                { this.props.user.friends.includes(this.props.id) ?
                    <button className="friends-button btn btn-danger" onClick={this.removeFriend}>Remove friend</button> :
                    <button className="friends-button btn btn-primary" onClick={this.addFriend} >Add friend</button>
                }
                <div className={this.props.small ? 'bio-small' : 'bio'}>
                    <textarea maxLength="500" disabled={true} className={this.props.small ? 'bio-text-small' : 'bio-text'} value={this.props.bio} placeholder='Bio' />
                </div>
            </div>
        )//arrumar o estilo, deixar tudo responsivo, mesmo no celular, e implementar os métodos
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(AnotherUserProfile)