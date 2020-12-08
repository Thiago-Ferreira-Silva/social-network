import './Comments.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { baseApiUrl, notify } from '../../global'
import Comment from './Comment'

const initialState = {
    newComment: null
}

class Comments extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.addText = this.addText.bind(this)
        this.postComment = this.postComment.bind(this)
        this.close = this.close.bind(this)
    }

    addText(event) {
        this.setState({ newComment: event.target.value })
    }

    postComment() {
        axios.post(`${baseApiUrl}/posts/post/${this.props.id}/comment`)
            .catch( err => notify(err, 'error'))
    }

    close() {
        this.props.close && this.props.close()
    }

    render() {
        return (
            <div className="comments-container">
                <div className="comments">
                    <button className="close-button" onClick={this.close} >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <div className="new-comment">
                        <textarea  maxLength="300" className="new-comment-text" value={ this.state.newComment || '' } placeholder="Make a comment" onChange={this.addText} ></textarea>
                        <button className="btn btn-primary post-button" onClick={this.postComment} >Post</button>
                    </div>
                    <Comment />
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Comments)
//talvez colocar isso no component post