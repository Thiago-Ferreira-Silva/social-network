import './Comments.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { baseApiUrl, notify } from '../../global'
import Comment from './Comment'

const initialState = {
    newComment: null,
    commentsJSX: []
}

class Comments extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.addText = this.addText.bind(this)
        this.postComment = this.postComment.bind(this)
        this.getCommentsJSX = this.getCommentsJSX.bind(this)
        this.close = this.close.bind(this)
    }

    addText(event) {
        this.setState({ newComment: event.target.value })
    }

    postComment() {
        const comment = [{}]
        comment[0].id = this.props.id
        comment[0].userId = this.props.user.id
        comment[0].text = this.state.newComment
        comment[0].date = new Date().toISOString()
        axios.post(`${baseApiUrl}/posts/post/${this.props.id}/comment`, comment)
            .then(_ => {
                this.getCommentsJSX(comment)
                this.setState({ newComment: null })
            })
            .catch(err => notify(err, 'error'))
    }

    async getCommentsJSX(comments) {
        const commentsJSX = this.state.commentsJSX
        comments.reverse()
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i]
            await axios.get(`${baseApiUrl}/users/${comment.userId}`)
                .then(res => {
                    const date = new Date(comment.date).toLocaleString()
                    const commentJSX = <Comment text={comment.text} date={date} author={res.data}
                        close={this.close} key={`${comment.date}-${comment.id}${comment.userId}`} />
                    commentsJSX.unshift(commentJSX)
                })
                .catch(err => notify(err, 'error'))
        }
        this.setState({ commentsJSX })
    }

    close() {
        this.props.close && this.props.close()
    }

    async componentDidMount() {
        await this.setState({ commentsJSX: [] })
        this.getCommentsJSX(JSON.parse(this.props.comments))
    }
    render() {
        return (
            <div className="comments-container">
                <div className="comments">
                    <button className="close-button" onClick={this.close} >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <div className="new-comment">
                        <textarea maxLength="300" className="new-comment-text" value={this.state.newComment || ''} placeholder="Make a comment" onChange={this.addText} ></textarea>
                        <button className="btn btn-primary post-button" onClick={this.postComment} >Post</button>
                    </div>
                    <div className='comments-list' >
                        {this.state.commentsJSX.length > 0 && this.state.commentsJSX}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Comments)