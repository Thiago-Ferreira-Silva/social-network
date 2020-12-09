import './Comments.css'

import React, { Component } from 'react'

export default class Comment extends Component {
    render () {
        return (
            <div className="comment">
                <div className="text">
                    {this.props.text}
                </div>
            </div>
        )
    }
}