import './Template.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import UserDropDown from './UserDropdown'

class Header extends Component {
    render() {
        const user = this.props.user
        return (
            <div className={`header ${user.name ? '': 'center'} `}>
                <div className={`empty ${user.name ? '': 'hidden'} `} ></div>
                <h1 className="title">
                    <Link className='link' to='/'>Social Network</Link>
                </h1>
                <UserDropDown />
            </div>
        )
    }
}

const mapStateToProps = store => ({
    user: store.userState.user
})

export default connect(mapStateToProps)(Header)

//veja se dá para fazer sem usar uma div vazia