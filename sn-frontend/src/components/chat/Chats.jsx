import './Chat.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import axios from 'axios'
import { baseApiUrl, notify } from '../../global'

import Chat from './Chat'

const socket = io(baseApiUrl)

const initialState = {
    message: '',
    chats: [],
    chatsJSX: {}
}

class Chats extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.inputMessage = this.inputMessage.bind(this)
        this.updateChatsJSX = this.updateChatsJSX.bind(this)
        this.getChats = this.getChats.bind(this)
        this.send = this.send.bind(this)
    }

    inputMessage(event) {
        console.log(event.target.value)
        this.setState({ message: event.target.value })
    }

    updateChatsJSX(msg, chatId, anotherUser = false) {
        const message = <div key={Math.random()} className={`message 
                            ${anotherUser ? '' : 'another-user-message'}`}>
            {msg}</div>

        const chatsJSX = this.state.chatsJSX
        const chat = chatsJSX[chatId] || <div key={Math.random()} className="chat">
                <div className="messages">{[]}</div>
                <input type="text" value={this.state.message} onChange={this.inputMessage} />
                <button onClick={this.send} >Send</button>
            </div>

        chat.props.children[0].props.children.push(message)
        chatsJSX[chatId] = chat

        this.setState({ chatsJSX })
    }

    getChats() {
        let chats = []
        const chatsJSX = {}

        axios.get(`${baseApiUrl}/chats/${this.props.user.id}`)
            .then(res => {
                chats = res.data
                
                if (chats.length < 1) {
                    chatsJSX[this.props.user.id] = <Chat id1={this.props.user.id} 
                    id2={this.props.place === 'anotherUser' ? this.props.userId : 0 /* resolver isso */} 
                    messages={[]} />
                }

                chats.forEach(chat => {
                    const chatId = chat.id1 === this.props.user.id ? chat.id2 : chat.id1
                    chatsJSX[chatId] = <Chat id1={chat.id1} id2={chat.id2} messages={chat.messages} send={msg => this.send(msg)} />
                })
                this.setState({ chats, chatsJSX })
            })
            .catch(err => notify(err, 'error'))
    }

    send(msg) {
        socket.emit('message', this.state.message, this.props.place === 'anotherUser' ? this.props.userId : null,
            this.props.user.id)
    }

    componentDidMount() {
        this.getChats()

        socket.connect()
        socket.emit('online', this.props.user.id, this.props.user.name)
        socket.on('message', (msg, chatId) => this.updateChatsJSX(msg, chatId, true))
    }

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
                    {/*Object.values(this.state.chatsJSX[1])*/}
                    {this.state.chatsJSX[1]}
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Chats)
//adicionar notificações
//comece fazendo um chat simples entre dois usuários e deixe para cuidar do armazenamento e das mensagens offline depois
//deixe os bugs e os ajustes de design para o final
// chat = { profilepicture, name, id1, id2, messages } message: { date, text, userid }