import './Chat.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { io } from 'socket.io-client'
import { baseApiUrl } from '../../global'

const initialState = {
    socket: io(baseApiUrl)
}

class Chat extends Component {

    state = { ...initialState }

    componentDidMount() {

    }

    render () {
        return (
            <div className="chat">

            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Chat)
//adicionar notificações