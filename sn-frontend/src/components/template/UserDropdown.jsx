import './Template.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveUser } from '../../redux/actions'
import { userKey } from '../../global'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

class UserDropDown extends Component {
    logout = () => {
        localStorage.removeItem(userKey)
        this.props.dispatch(saveUser({}))
        window.location = '/auth'
    }

    render() {
        const name = this.props.user.name
        return (
            <div className="user-dropdown">
                <div className="user-button">
                    <span className="name">{name}</span>
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
                <div className="user-dropdown-content">
                    <Link to='/profile' className="dropdown-link" ><FontAwesomeIcon icon={faCogs} />    My profile</Link>
                    <div className="dropdown-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt} />    Logout</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    user: store.userState.user
})

export default connect(mapStateToProps)(UserDropDown)