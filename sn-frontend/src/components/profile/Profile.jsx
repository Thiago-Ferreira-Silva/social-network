import './Profile.css'

import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { baseApiUrl } from '../../global'

const initialState = { profilePicture: null }

class Profile extends Component {
    state = { ...initialState }

    selectPicture = event => {
        this.setState({ profilePicture: event.target.files[0] })
    }

    uploadPicture = () => {
        const formData = new FormData()
        formData.append('picture', this.state.profilePicture)
        axios.post(`${baseApiUrl}/users/${this.props.user.id}/picture`, formData, { headers: {'Content-Type': 'multipart/form-data' } })
    }

    render () {
        return (
            <div className="profile">
                <h1>Profile</h1>
                <input type="file" onChange={this.selectPicture}/>
                <button onClick={this.uploadPicture}>Upload</button>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Profile)

//acho que talvez seja melhor criar um componente separado para o upload da foto; e adicione uma bio à tabela users
//e também achp que é melhor usar o bind do this