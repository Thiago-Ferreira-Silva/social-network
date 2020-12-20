import './Chat.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { io } from 'socket.io-client'
import { baseApiUrl } from '../../global'
//não é assim

const initialState = {
    socket: io(baseApiUrl),
    message: ''
}

class Chat extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.inputMessage = this.inputMessage.bind(this)
        this.send = this.send.bind(this)
    }

    inputMessage(event) {
        this.setState({ message: event.target.value })
    }

    send() {
        console.log(this.state.message)
        this.state.socket.emit('message', this.state.message)
        this.setState({ message: '' })
    }

    render () {
        return (
            <div className="chat">
                <input type="text" value={this.state.message} onChange={this.inputMessage} />
                <button onClick={this.send} >Send</button>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Chat)
//adicionar notificações