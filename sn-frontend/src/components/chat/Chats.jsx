import './Chat.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import axios from 'axios'
import { baseApiUrl, notify } from '../../global'
import { updateChats } from '../../redux/actions/index'

import Chat from './Chat'

const initialState = {
    chatsJSX: []
}

const socket = io(baseApiUrl)

class Chats extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.addMessageToChat = this.addMessageToChat.bind(this)
        this.getChats = this.getChats.bind(this)
        this.send = this.send.bind(this)
    }

    addMessageToChat(msg, chatId, anotherUser = false) {
        const message = <div key={Math.random()} className={`message 
                            ${anotherUser ? '' : 'another-user-message'}`}>
            {msg}</div>

        const chats = this.props.chats
        const chat = chats[chatId]
        chat.messages.push(message)
        chats[chatId] = chat

        this.props.dispatch(updateChats(chats))
    }

    getChats() {
        axios.get(`${baseApiUrl}/chats/${this.props.user.id}`)
            .then(async res => {
                const chats = res.data
                const chatsObject = {}
                const chatsJSX = this.state.chatsJSX

                if (chats.length < 1) {
                    await axios.post(`${baseApiUrl}/chats/${this.props.userId}`, this.props.location.state)
                        .then(res => {
                            chats.push(res.data)
                        })
                        .catch(err => notify(err, 'error'))
                }
                chats.forEach(chat => {
                    const messages = chat.messages.map(message => {
                        return <div key={Math.random()} className={`message 
                        ${this.props.user.id === message.userId ? '' : 'another-user-message'}`}>
                        {message.text}</div>
                    })
                    chat.messages = messages
                    
                    chatsObject[chat.chatId] = chat

                    chatsJSX.push(<Chat chatId={chat.chatId} key={`${chat.id1}-${chat.id2}`} 
                        send={(msg, chatId) => this.send(msg, chatId)} />)
                })

                this.props.dispatch(updateChats(chatsObject))
            })
            .catch(err => notify(err, 'error'))
    }

    send(msg, chatId) {
        socket.emit('message', msg, chatId,
            this.props.user.id)
        this.addMessageToChat(msg, chatId)
    }

    componentDidMount() {
        this.getChats()

        socket.connect()
        socket.emit('online', this.props.user.id)
        socket.on('message', (msg, chatId) => {
            console.log(msg, chatId)
            this.addMessageToChat(msg, chatId, true)
        })
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
                    {this.state.chatsJSX}
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({ 
    user: store.userState.user,
    chats: store.chatsState.chats 
})

export default connect(mapStateToProps)(Chats)
//talvez colocar esse componente em sua própria rota, não no profile
//adicionar notificações
//comece fazendo um chat simples entre dois usuários e deixe para cuidar do armazenamento e das mensagens offline depois
//deixe os bugs e os ajustes de design para o final
// chat = { profilepicture, name, id1, id2, messages } message: { date, text, userid }