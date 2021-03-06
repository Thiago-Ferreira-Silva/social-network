import './Template.css'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveUser } from '../../redux/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

let toAuth = false

class UserDropDown extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout = () => {
        this.props.dispatch(saveUser({}))
        toAuth = true
    }

    render() {
        const name = this.props.user.name
        if (toAuth) {
            toAuth = false
            return <Redirect to='/auth' />
        }

        return (
            <div className={`user-dropdown ${name ? '': 'hidden'} ${this.props.isTouch ? 'is-touch' : ''} `}>
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
    user: store.userState.user,
    isTouch: store.isTouchOrAuthState.isTouch
})

export default connect(mapStateToProps)(UserDropDown)