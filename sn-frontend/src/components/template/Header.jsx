import './Template.css'
import React, { Component} from 'react'

import { BrowserRouter, Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <h1 className="title">
                    <BrowserRouter>
                        <Link to='/'>Social Network</Link>
                    </BrowserRouter>
                </h1>
            </div>
        )
    }
}

//o css não está funcionando direito e o router não está funcionando nem um pouco