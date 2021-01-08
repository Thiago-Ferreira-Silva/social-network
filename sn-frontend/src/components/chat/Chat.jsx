import './Chat.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { baseApiUrl } from '../../global'
const socket = io(baseApiUrl)

const initialState = {
    message: '',
    messages: []
}

class Chat extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.inputMessage = this.inputMessage.bind(this)
        this.addMessage = this.addMessage.bind(this)
        this.send = this.send.bind(this)
    }

    inputMessage(event) {
        this.setState({ message: event.target.value })
    }

    addMessage(msg) {
        console.log(msg)
        const messages = this.state.messages
        const message = <div className="message" key={msg} >{msg}</div>
        messages.push(message)
        this.setState({ messages })
    }

    send() {
        socket.emit('message', this.state.message, this.props.place === 'anotherUser' ? this.props.userId : null,
        this.props.user.id)
        this.addMessage(this.state.message)
        this.setState({ message: '' })
    }

    componentDidMount() {
        socket.connect()
        socket.emit('online', this.props.user.id, this.props.user.name)
        socket.on('message', msg => this.addMessage(msg))
    }

    componentWillUnmount() {
        socket.disconnect()
    }

    componentDidUpdate() {
        socket.connect()
    }

    render () {
        return (
            <div className="chat">
                <div className="messages">{this.state.messages}</div>
                <input type="text" value={this.state.message} onChange={this.inputMessage} />
                <button onClick={this.send} >Send</button>
            </div>
        )
    }
}// talvez, só talvez, usar o redux com redux persirst para armazenar as mensagens
// primeiro cuidar do armazenamento e recuperação das mensagens para depois cuidar do resto

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Chat)
//adicionar notificações
//comece fazendo um chat simples entre dois usuários e deixe para cuidar do armazenamento e das mensagens offline depois
//deixe os bugs e os ajustes de design para o final
