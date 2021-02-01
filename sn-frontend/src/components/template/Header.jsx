import './Template.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import UserDropDown from './UserDropdown'

class Header extends Component {
    render() {
        const user = this.props.user
        return (
            <div className={`header ${user.name ? '': 'center'} ${this.props.isTouch ? 'is-touch-header' : ''}
             ${ window.location.pathname === '/auth' ? 'is-auth' : ''} `}>
                <div className={`empty ${user.name ? '': 'hidden'} `} ></div>
                <h1 className="title">
                    <Link className='link' to='/'>Social Network</Link>
                    <Link className='link-small' to='/'>SN</Link>
                </h1>
                <UserDropDown />
            </div>
        )
    }
}

const mapStateToProps = store => ({
    user: store.userState.user,
    isTouch: store.isTouchState.isTouch
})

export default connect(mapStateToProps)(Header)