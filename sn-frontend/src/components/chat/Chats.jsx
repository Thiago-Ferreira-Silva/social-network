import './Chat.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import axios from 'axios'
import { baseApiUrl, notify } from '../../global'
import { updateChats } from '../../redux/actions/index'

import Chat from './Chat'

const initialState = {
    chatsJSX: {},
    selectedChat: null,
    chatsList: []
}

const socket = io(baseApiUrl)

class Chats extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.addMessageToChat = this.addMessageToChat.bind(this)
        this.getChats = this.getChats.bind(this)
        this.setSelected = this.setSelected.bind(this)
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
        console.log(chats) /////////////////////////////////////////////////////////////////////////////
        this.props.dispatch(updateChats(chats))
    }

    getChats() {
        axios.get(`${baseApiUrl}/chats/${this.props.user.id}`)
            .then(async res => {
                const chats = res.data
                const chatsObject = {}
                const chatsJSX = {}
                const chatsList = []
                //confira se você não está alterando o state da forma errada em mais lugares

                let newChat = false

                chats.forEach(chat => {
                    //está muito bugado
                    if (chat.id1 !== this.props.location.state.id1 && chat.id2 !== this.props.location.state.id1) {
                        console.log('id1', chat.id1, 'id2', chat.id2)
                        newChat = true
                    } else {
                        newChat = false
                    }
                })

                if (newChat) {
                    await axios.post(`${baseApiUrl}/chats/${this.props.location.state.id1}`, this.props.location.state)
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

                    chatsJSX[chat.chatId] = <Chat chatId={chat.chatId} key={`${chat.id1}-${chat.id2}`}
                        send={(msg, chatId) => this.send(msg, chatId)} />

                    chatsList.push(<div onClick={this.setSelected(chat.chatId)} className='select-chat' key={chat.chatId} >
                        <div className="name">
                        {chat.name}
                        </div>
                        <img src={chat.profilePicture} alt=""/>
                    </div>)
                })
                
                this.props.dispatch(updateChats(chatsObject))
                this.setState({ selectedChat: chats[0].chatId, chatsJSX, chatsList})
            })
            .catch(err => notify(err, 'error'))
    }

    setSelected(chatId) {
        this.setState({ selectedChat: chatId })
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
            this.addMessageToChat(msg, chatId, true)
        })
    }

    componentWillUnmount() {
        socket.disconnect()
    }

    render() {
        return (
            <div className="chat-container">
                {this.state.chatsList}
                {this.state.selectedChat ? this.state.chatsJSX[this.state.selectedChat] : ''}
            </div>
        )
    }
}

const mapStateToProps = store => ({
    user: store.userState.user,
    chats: store.chatsState.chats
})

export default connect(mapStateToProps)(Chats)