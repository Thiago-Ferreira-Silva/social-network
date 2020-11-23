/*
Tente achar um nome melhor para esse componente.
Use props para deixar mais versátil.
botões de conversar e adicionar ou remover amizade (determinar qual usando o array friends na store)
Duas versões definidas por props: small, e big
E o post deve conter o nome e a imagem de perfil do usuário
*/
import './Profile.css'
import pictureDefault from '../../assets/profile_default.png'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class AnotherUserProfile extends Component {
    render() {
        return (
            <div className={this.props.small ? 'user-small' : 'user'}>
                <div className={this.props.small ? 'image-container-small' : 'image-container'}>
                    {this.props.profilePicture ?
                        <img className={this.props.small ? 'image-small' : 'image'} src={this.props.profilePicture}
                            alt="profile_picture" height='180' /> :
                        <img className={this.props.small ? 'image-small' : 'image'} src={pictureDefault}
                            alt="profile_picture" height='180' />}
                </div>
                <div className={this.props.small ? 'name-small' : 'name'}>{this.props.name}</div>
                <div className={this.props.small ? 'bio-small' : 'bio'}>
                    <textarea maxLength="500" disabled={true} className={this.props.small ? 'bio-text-small' : 'bio-text'} value={this.props.bio} placeholder='Bio' />
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(AnotherUserProfile)