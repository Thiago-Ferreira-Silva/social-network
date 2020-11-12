import './Post.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { handleImage } from '../../utils/imageHandler'
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
        this.post = this.post.bind(this)
    }

    async addImage(event) {
        await handleImage(event.target.files[0], `${baseApiUrl}/posts`, 1000, 1000, 100, 100)
    }

    removeImage() {

    }

    post() {

    }

    render () {
        return (
            <div className="new-post">
                <textarea maxLength="600" id="text" className="new-post-text" defaultValue={ this.state.text || 'Escreva algo aqui'} ></textarea>
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