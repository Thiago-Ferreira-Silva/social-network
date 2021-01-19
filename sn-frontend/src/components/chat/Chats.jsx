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
        this.updateChatsJSX = this.updateChatsJSX.bind(this)
        this.getChats = this.getChats.bind(this)
        this.send = this.send.bind(this)
    }

    updateChatsJSX(msg, chatId, anotherUser = false) {
        const message = <div key={Math.random()} className={`message 
                            ${anotherUser ? '' : 'another-user-message'}`}>
            {msg}</div>

        const chatsJSX = this.state.chatsJSX
        const chat = chatsJSX[chatId]
        chat.props.messages.push(message)
        chatsJSX[chatId] = chat

        this.setState({ chatsJSX })
    }

    getChats() {
        axios.get(`${baseApiUrl}/chats/${this.props.user.id}`)
            .then(async res => {
                const chats = res.data
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
                const chatsJSX = this.state.chatsJSX
                chats.forEach(chat => {
                    const messages = chat.messages.map(message => {
                        return <div key={Math.random()} className={`message 
                        ${this.props.user.id = message.userId ? '' : 'another-user-message'}`}>
                        {message.text}</div>
                    })

                    const chatId = chat.id1 === this.props.user.id ? chat.id2 : chat.id1
                    chatsJSX[chatId] = <Chat id1={this.props.user.id} id2={chatId} messages={messages}
                        picture={chat.picture} name={chat.name} send={msg => this.send(msg)} />
                })
                this.setState({ chats, chatsJSX })
            })
            .catch(err => notify(err, 'error'))
    }

    send(msg) {
        socket.emit('message', msg, this.props.place === 'anotherUser' ? this.props.userId : null,
            this.props.user.id)
        //por algum motivo, this.props.user.id é uma string vazia aqui
    }

    componentDidMount() {
        this.getChats()

        socket.connect()
        socket.emit('online', this.props.user.id, this.props.user.name)
        socket.on('message', (msg, chatId) => {
            console.log(msg)
            console.log(chatId)
            this.updateChatsJSX(msg, chatId, true)
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
                    {/*Object.values(this.state.chatsJSX[1])*/}
                    {this.state.chatsJSX[1]}
                    {this.state.chatsJSX[2]}
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