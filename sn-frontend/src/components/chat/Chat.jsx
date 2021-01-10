import './Chat.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import axios from 'axios'
import { baseApiUrl, notify } from '../../global'
const socket = io(baseApiUrl)

const initialState = {
    message: '',
    chats: [],
    chatsJSX: {}
}

class Chat extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.inputMessage = this.inputMessage.bind(this)
        this.addMessage = this.addMessage.bind(this)
        this.getChats = this.getChats.bind(this)
        this.send = this.send.bind(this)
    }

    inputMessage(event) {
        this.setState({ message: event.target.value })
    }

    addMessage(msg) {
        //const chats = this.state.chatsJSX
        //const message = <div className="message" key={msg} >{msg}</div>
        //messages.push(message)
        //this.setState({ messages })
        //criar um método updateChatsJSX(name, id1, id2, messages)
        //deve adicionar as mensagens passadas às que ja tem se for o caso
        //talzez seja necessário colocar as mensagens separadamente
    }

    getChats() {
        let chats = []
        const chatsJSX = {}

        axios.get(`${baseApiUrl}/chats/${this.props.user.id}`)
            .then(res => {
                chats = res.data
                chats.forEach(chat => {
                    const messages = chat.messages.map(message => {
                        return <div key={Math.random()} className={`message 
                        ${message.userId === this.props.user.id ? '' : 'another-user-message'}`}>
                            {message.text}</div>
                    })
                    chatsJSX[chat.name] = <div key={`${chat.id1}${chat.id2}`} className="chat">
                        <div className="messages">{messages}</div>
                        <input type="text" value={this.state.message} onChange={this.inputMessage} />
                        <button onClick={this.send} >Send</button>
                    </div>
                })
                this.setState({ chats, chatsJSX })
            })
            .catch(err => notify(err, 'error'))
    }

    send() {
        socket.emit('message', this.state.message, this.props.place === 'anotherUser' ? this.props.userId : null,
            this.props.user.id)
        this.addMessage(this.state.message)
        this.setState({ message: '' })
    }

    componentDidMount() {
        this.getChats()

        socket.connect()
        socket.emit('online', this.props.user.id, this.props.user.name)
        socket.on('message', msg => this.addMessage(msg))
    }// precisa ser possível atualizar as mensagens diretamente no dom; me parece uma boa colocar isso em métodos separados para despoluir o componentDidMount

    componentWillUnmount() {
        socket.disconnect()
    }

    componentDidUpdate() {
        socket.connect()
    }

    render() {
        return (
            <div className="chat-container">
                <div className="chats">
                    {Object.values(this.state.chatsJSX)}
                </div>
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
// chat = { profilepicture, name, id1, id2, messages } message: { date, text, userid }