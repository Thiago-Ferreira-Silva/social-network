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
                //confira se você não está alterando o state da forma errada em mais lugares

                let newChat = true

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
                    chat.messages = messages

                    chatsJSX[chat.chatId] = <Chat chatId={chat.chatId} socket={socket} messages={messages}
                        key={`${chat.id1}-${chat.id2}`} />

                    chatsList.push(<button onClick={e => this.setSelected(e)} value={chat.chatId}
                        className='select-chat' key={chat.chatId} >
                        {chat.name}
                    </button>)
                })

                this.setState({ selectedChat: chats[0].chatId, chatsJSX, chatsList })
            })
            .catch(err => notify(err, 'error'))
    }

    setSelected(e) {
        this.setState({ selectedChat: e.target.value })
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
                {this.state.chatsList}
                {this.state.selectedChat ? this.state.chatsJSX[this.state.selectedChat] : ''}
            </div>
        )
    }
}

const mapStateToProps = store => ({
    user: store.userState.user
})

export default connect(mapStateToProps)(Chats)