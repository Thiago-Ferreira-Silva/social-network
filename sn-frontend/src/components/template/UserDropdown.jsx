import './Template.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCogs } from '@fortawesome/free-solid-svg-icons'

export default class UserDropDown extends Component {
    render () {
        return (
            <div className="user-dropdown">
                <div className="user-button">
                    <span>name</span>
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
                <div className="user-dropdown-content">
            <Link to='/profile'><FontAwesomeIcon icon={faCogs} /> My profile</Link>
                </div>
            </div>
        )
    }
}

//mude os nomes i ícones e veja se o redux funciona como o mapState do vuex