import './Post.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons'

import { resizeImage } from '../../utils/imageHandler'
import { baseApiUrl, notify } from '../../global'

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
        await resizeImage(event.target.files[0], 800, 800, 100, 100, (image) => {
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
            .then(_ => {
                this.setState({ ...initialState })
                notify()
            })
            .catch(err => notify(err, 'error'))
    }

    render() {
        return (
            <div className="new-post">
                <textarea maxLength="600" id="text" className="new-post-text" onChange={this.addText} value={this.state.text || ''} placeholder='Write something here...' ></textarea>
                <div className="new-post-image-container">
                    <input type="file" className="input-file" onChange={this.addImage}
                        ref={imageInput => this.imageInput = imageInput} />
                    {this.state.image ?
                        <button className="image-button" onClick={this.removeImage}><FontAwesomeIcon icon={faTrash} /></button> :
                        <button className="image-button" onClick={() => this.imageInput.click()}><FontAwesomeIcon icon={faImage} /></button>
                    }
                    {this.state.image && <img src={this.state.image} alt="" className="image" />}
                    <button className="btn btn-primary post-button" onClick={this.post}>Post</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(NewPost)