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

    constructor(props) {
        super(props)
        this.addFriend = this.addFriend.bind(this)
        this.removeFriend = this.removeFriend.bind(this)
    }

    addFriend() {
        axios.post(`${baseApiUrl}/users/${this.props.user.id}/friends`, { friendId: this.props.id })
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
                const friends = { ...this.props.user.friends }
                const friend = this.props.id

                delete friends[friend]

                this.props.dispatch(saveUser({ ...this.props.user, friends }))

                this.props.remove && this.props.remove()
                //faça uma animação para remover
                notify()
            })
            .catch(err => notify(err, 'error'))
    }

    render() {
        return (
            <div className={this.props.small ? 'user-container-small' : 'another-user-container'}>
                <div className={this.props.small ? 'user-small' : 'user'} >
                    {this.props.user.friends[this.props.id] ?
                        <div className="friends-button">
                            <button className="btn btn-danger" onClick={this.removeFriend}>Remove</button>
                        </div> :
                        <div className="friends-button">
                            <button className="btn btn-primary" onClick={this.addFriend} >Add</button>
                        </div>
                    }
                    <div className={this.props.small ? '' : 'profile-picture'}>
                        <div className={this.props.small ? 'image-container-small' : 'image-container'}>
                            {this.props.profilePicture ?
                                <img className={this.props.small ? 'image-small' : 'image'} src={this.props.profilePicture}
                                    alt="profile_picture" height='180' /> :
                                <img className={this.props.small ? 'image-small' : 'image'} src={pictureDefault}
                                    alt="profile_picture" height='180' />}
                        </div>
                    </div>
                    {this.props.small ?
                        <Link className='name-small-link' to={{
                            pathname: '/user',
                            state: {
                                id: this.props.id,
                                name: this.props.name,
                                bio: this.props.bio,
                                profilePicture: this.props.profilePicture,
                                small: false
                            }
                        }} >
                            <div className="name-small">
                                {this.props.name}
                            </div></Link>
                        :
                        <div className='name'>{this.props.name}</div>}
                    {this.props.small ? '' :
                        <div className='bio'>
                            <textarea maxLength="500" disabled={true} className='bio-text' value={this.props.bio || ''} placeholder='Bio' />
                        </div>
                    }
                </div>
            </div>
        )//deixar tudo responsivo, mesmo no celular, e implementar o estilo para user-small de forma que fique compacto e caibam vários na mesma linha
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(AnotherUserProfile)