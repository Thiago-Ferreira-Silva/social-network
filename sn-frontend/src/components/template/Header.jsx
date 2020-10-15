import './Template.css'
import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import UserDropDown from './UserDropdown'

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="empty"></div>
                <h1 className="title">
                    <Link className='link' to='/'>Social Network</Link>
                </h1>
                <UserDropDown />
            </div>
        )
    }
}

//veja se dá para fazer sem usar uma div vazia