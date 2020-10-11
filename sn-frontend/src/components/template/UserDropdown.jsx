import './Template.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class UserDropDown extends Component {
    render () {
        return (
            <div className="user-dropdown">
                <div className="user-button">
                    <span className="d-none d-sm-block-name">name</span>
                    <i className="fa fa-angle-down"></i>
                </div>
                <div className="user-dropdown-content">
            <Link to='/profile'><i className="fa fa-cogs"></i> My profile</Link>
                </div>
            </div>
        )
    }
}

//mude os nomes i ícones e veja se o redux funciona como o mapState do vuex