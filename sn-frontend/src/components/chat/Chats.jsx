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
                    await axios.get(`${baseApiUrl}/users/${this.props.userId}/picture`)
                        .then(res => {
                            const [picture, name] = res.data
                            chats[0] = {
                                id1: this.props.user.id,
                                id2: this.props.userId,
                                messages: [],
                                picture,
                                name
                            }
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

                    const chatId = chat.id1 === this.props.user.id ? chat.id2 : chat.id1
                    
                    chatsObject[chatId] = chat

                    chatsJSX.push(<Chat chatId={chatId} key={`${chat.id1}-${chat.id2}`} />)
                })

                this.props.dispatch(updateChats(chatsObject))
            })
            .catch(err => notify(err, 'error'))
    }

    send(msg) {
        socket.emit('message', msg, this.props.place === 'anotherUser' ? this.props.userId : null,
            this.props.user.id)
        this.addMessageToChat(msg, this.props.userId)
    }

    componentDidMount() {
        this.getChats()

        socket.connect()
        socket.emit('online', this.props.user.id, this.props.user.name)
        socket.on('message', (msg, chatId) => {
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