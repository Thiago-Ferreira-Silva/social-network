/*
Tente achar um nome melhor para esse componente.
Use props para deixar mais versátil.
botões de conversar e adicionar ou remover amizade (determinar qual usando o array friends na store)
Duas versões definidas por props: small, e big
E o post deve conter o nome e a imagem de perfil do usuário
*/
import './Profile.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class AnotherUserProfile extends Component {
    render() {
        return (
            <div className="user">
                <div className="user-name">{this.props.name}</div>
                <div className="user-picture"><img src={this.props.profilePicture} alt="" /></div>
                <div className="user-bio">{this.props.bio}</div>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(AnotherUserProfile)