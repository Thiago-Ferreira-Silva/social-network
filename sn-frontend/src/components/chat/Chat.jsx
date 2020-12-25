/*import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { baseApiUrl } from '../../global'
import './Chat.css'

export default function Chat() {

    const ENDPOINT = baseApiUrl

    useEffect(() => {
        const socket = io(ENDPOINT)
        socket.on('hello', msg => console.log(msg))

        socket.emit('message', 'This is a message')

        return () => {
            socket.disconnect()
        }

    }, [ENDPOINT])

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
import { baseApiUrl } from '../../global'
const socket = io(baseApiUrl)

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
        socket.emit('message', this.state.message)
        this.setState({ message: '' })
    }

    componentDidMount() {
        //agora faça o chat
    }

    componentWillUnmount() {
        socket.disconnect()
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
