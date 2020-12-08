import './Comments.css'

import React, { Component } from 'react'

export default class Comment extends Component {
    render () {
        return (
            <div className="comment">
                I'm a comment, and I must have text, userId, date, user name and profile picture (the last two won't stay in the database)
            </div>
        )
    }
}