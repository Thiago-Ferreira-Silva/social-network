import './Template.css'
import React, { Component } from 'react'

import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <h1 className="title">
                    <Link className='link' to='/'>Social Network</Link>
                </h1>
            </div>
        )
    }
}