import './Profile.css'

import React, { Component } from 'react'
import axios from 'axios'
import { baseApiUrl } from '../../global'

const initialState = { profilePicture: null }

export default class Profile extends Component {
    state = { ...initialState }

    selectPicture = event => {
        this.setState({ profilePicture: event.target.files[0] })
    }

    uploadPicture = () => {
        const formData = new FormData()
        formData.append('picture', this.state.profilePicture)
        axios.post(`${baseApiUrl}/users/id/picture`, formData)
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
//acho que talvez seja melhor criar um componente separado para o upload da foto; e adicione uma bio à tabela users
//e também achp que é melhor usar o bind do this