import './Comments.css'
import pictureDefault from '../../assets/profile_default.png'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Comment extends Component {
    render() {
        return (
            <div className="comment">
                <div className="aside">
                    <div className="profile-picture">
                        {this.props.author.profilePicture ?
                            <img src={this.props.author.profilePicture} alt="profile_picture" /> :
                            <img src={pictureDefault} alt="profile_picture" />
                        }
                    </div>
                    <div className="name">
                        <Link onClick={document.body.classList.remove('show-comments')} to={{
                            pathname: '/user',
                            state: {
                                id: this.props.author.id,
                                name: this.props.author.name,
                                bio: this.props.author.bio,
                                profilePicture: this.props.author.profilePicture,
                                small: false
                            }
                        }}>
                            {this.props.author.name}
                        </Link>
                    </div>
                    <div className="date">
                        {this.props.date}
                    </div>
                </div>
                <div className="text">
                    {this.props.text}
                </div>
            </div>
        )
    }
}