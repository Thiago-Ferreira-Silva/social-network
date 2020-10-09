import './Template.css'
import React, { Component} from 'react'

import { BrowserRouter, Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <h1 className="title">
                    <BrowserRouter>
                        <Link className='link' to='/'>Social Network</Link>
                    </BrowserRouter>
                </h1>
            </div>
        )
    }
}