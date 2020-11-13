import './Post.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { resizeImage } from '../../utils/imageHandler'
import { baseApiUrl } from '../../global'

const initialState = {
    text: null,
    image: null
}

class NewPost extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.addImage = this.addImage.bind(this)
        this.removeImage = this.removeImage.bind(this)
        this.addText = this.addText.bind(this)
        this.post = this.post.bind(this)
    }

    async addImage(event) {
        await resizeImage(event.target.files[0], 1000, 1000, 100, 100, ( image ) => {
            this.setState({ image })
        })
    }

    removeImage() {
        this.setState({ image: null })
    }

    addText(event) {
        this.setState({ text: event.target.value })
    }

    post() {
        axios.post(`${baseApiUrl}/posts`, { ...this.state, user_id: this.props.user.id })
        //isso deve ser mudado quando adicionar as outras funcionalidades
    }

    render () {
        return (
            <div className="new-post">
                <textarea maxLength="600" id="text" className="new-post-text" onChange={this.addText} defaultValue={ this.state.text || 'Escreva algo aqui'} ></textarea>
                { this.state.image && <img src={this.state.image.image} alt="" className="image"/> }
                <input type="file" className="input-file" onChange={this.addImage}
                        ref={imageInput => this.imageInput = imageInput} />
                { this.state.image ? 
                <button className="trocar-por-icone" onClick={this.removeImage}>Ícone de remover imagem</button> :
                <button className="trocar-por-icone" onClick={() => this.imageInput.click()}>Ícone de adicionar imagem</button>
                }
                <button className="btn btn-primary" onClick={this.post}>Post</button>
            </div>
        )
    } 
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(NewPost)