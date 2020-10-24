import './Profile.css'

import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { baseApiUrl } from '../../global'

const initialState = { image: null }

class Profile extends Component {
    state = { ...initialState }

    selectPicture = async event => {
        const PictureBinary = await this.getBinaryFromFile(event.target.files[0])
        this.setState({ image: PictureBinary })
    }

    getBinaryFromFile = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.addEventListener('load', () => {console.log('done')
                resolve(reader.result)})
            reader.addEventListener('error', err => reject(err))

            reader.readAsDataURL(file)
        })
    }

    uploadPicture = () => {
        const pic = { 'image': this.state.image }
        axios.post(`${baseApiUrl}/users/${this.props.user.id}/picture`, pic )
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