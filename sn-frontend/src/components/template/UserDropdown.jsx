import './Template.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCogs } from '@fortawesome/free-solid-svg-icons'

class UserDropDown extends Component {
    render () {
        const name = this.props.user.name
        return (
            <div className="user-dropdown">
                <div className="user-button">
                    <span className="name">{name}</span>
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
                <div className="user-dropdown-content">
            <Link to='/profile'><FontAwesomeIcon icon={faCogs} /> My profile</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    user: store.userState.user
})

export default connect(mapStateToProps)(UserDropDown)

//está sumindo quando atualiza a página