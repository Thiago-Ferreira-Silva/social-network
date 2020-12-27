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
                    <Link className='link-small' to='/'>SN</Link>
                </h1>
                <UserDropDown />
            </div>
        )
    }
}
// comece com a responsividade por aqui
// mudar de social network para sn e transformar o dropdown em dois botões fixos para telas menores 
const mapStateToProps = store => ({
    user: store.userState.user
})

export default connect(mapStateToProps)(Header)
//também parece ser uma boa disponibilizar mais coisas offline
//veja se dá para fazer sem usar uma div vazia