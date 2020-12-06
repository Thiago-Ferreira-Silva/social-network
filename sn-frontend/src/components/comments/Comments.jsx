import './Comments.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Comment from './Comment'

const initialState = {}

class Comments extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.close = this.close.bind(this)
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
                        make a new comment
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