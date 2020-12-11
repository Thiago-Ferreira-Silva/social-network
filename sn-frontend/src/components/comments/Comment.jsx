import './Comments.css'

import React, { Component } from 'react'

export default class Comment extends Component {
    render () {
        return (
            <div className="comment">
                <div className="profile-picture">
                    <img src={this.props.author.profilePicture} alt="profile_picture"/>
                </div>
                <div className="name">
                    {this.props.author.name}
                </div>
                <div className="date">
                    {this.props.date}
                </div>
                <div className="text">
                    {this.props.text}
                </div>
            </div>
        )
    }
}