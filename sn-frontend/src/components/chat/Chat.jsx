import './Chat.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { io } from 'socket.io-client'

class Chat extends Component {
    //fazer também a parte do chat no backend
    render () {
        return (
            <div className="chat">

            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Chat)