/*import React, { useEffect } from 'react'
import socketIoClient from 'socket.io-client'
import { baseApiUrl } from '../../global'
import './Chat.css'

export default function Chat() {
    useEffect(() => {
        const socket = socketIoClient(baseApiUrl)
        socket.on('hello', msg => console.log(msg))
    }, [])

    return (
        <div className="chat">
            <input type="text"  />
            <button >Send</button>
        </div>
    )
}*/

import './Chat.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
//import { baseApiUrl } from '../../global'
//import { socket } from '../../global'
//não é assim

//let socket

const socket = io('http://localhost:8082')
socket.on('hello', msg => console.log(msg))
socket.emit('message', 'Hello world!')

const initialState = {
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
        this.setState({ message: '' })
    }

    componentDidMount() {
        //socket.emit('message', 'This is a message')
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
