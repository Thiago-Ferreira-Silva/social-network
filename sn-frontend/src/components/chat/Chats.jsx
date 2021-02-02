import './Chat.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import axios from 'axios'
import { baseApiUrl, notify } from '../../global'

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
        this.getChats = this.getChats.bind(this)
        this.setSelected = this.setSelected.bind(this)
    }

    getChats() {
        axios.get(`${baseApiUrl}/chats/${this.props.user.id}`)
            .then(async res => {
                const chats = res.data
                const chatsJSX = {}
                const chatsList = []

                let newChat = true
                let selectedId = null

                chats.forEach(chat => {
                    if (chat.id1 === this.props.location.state.id1 || chat.id2 === this.props.location.state.id1) {
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
                    chat.messages = messages.reverse()

                    chatsJSX[chat.chatId] = <Chat chatId={chat.chatId} socket={socket} messages={messages}
                        name={chat.name} profilePicture={chat.profilePicture} key={`${chat.id1}-${chat.id2}`} />
                    chatsList.push(<button onClick={e => this.setSelected(e)} value={chat.chatId} id={chat.chatId}
                        className='select-chat' key={chat.chatId} >
                        {chat.name}
                    </button>)
                    const id = this.props.location.state.id1
                    if (chat.id1 === id || chat.id2 === id) selectedId = chat.chatId
                })

                this.setState({ selectedChat: selectedId, chatsJSX, chatsList })
            })
            .catch(err => notify(err, 'error'))
    }

    setSelected(e) {
        document.getElementById(this.state.selectedChat).classList.remove('selected')
        this.setState({ selectedChat: e.target.value })
        document.getElementById(e.target.value).classList.add('selected')
    }

    componentDidMount() {
        this.getChats()

        socket.connect()
        socket.emit('online', this.props.user.id)
    }

    componentWillUnmount() {
        socket.disconnect()
    }

    render() {
        return (
            <div className="chat-container">
                <div className="chats-list">
                    {this.state.chatsList}
                </div>
                {this.state.selectedChat ? this.state.chatsJSX[this.state.selectedChat] : ''}
            </div>
        )
    }
}

const mapStateToProps = store => ({
    user: store.userState.user
})

export default connect(mapStateToProps)(Chats)