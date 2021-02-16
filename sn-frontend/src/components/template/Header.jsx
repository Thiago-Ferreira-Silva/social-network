import './Template.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import UserDropDown from './UserDropdown'
 
class Header extends Component {
    render() {
        const user = this.props.user
        return (
            <header className={`header ${user.name ? '': 'center'} ${this.props.isTouch ? 'is-touch-header' : ''}
             ${ this.props.isAuth ? 'is-auth' : ''} `} >
                <div className={`empty ${user.name ? '': 'hidden'} `} ></div>
                <h1 className="title" >
                    <Link className='link' to='/'>Social Network</Link>
                    <Link className='link-small' to='/' >SN</Link>
                </h1>
                <UserDropDown />
            </header>
        )
    }
}

const mapStateToProps = store => ({
    user: store.userState.user,
    isTouch: store.isTouchOrAuthState.isTouch,
    isAuth: store.isTouchOrAuthState.isAuth
})

export default connect(mapStateToProps)(Header)