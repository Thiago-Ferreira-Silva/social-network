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
        const chat = chatsJSX[chatId]

        chat.props.children[0].props.children.push(message)
        chatsJSX[chatId] = chat

        this.setState({ chatsJSX })

        setTimeout(() => console.log(this.state.chatsJSX), 5000)
    }

    getChats() {
        let chats = []
        const chatsJSX = {}

        axios.get(`${baseApiUrl}/chats/${this.props.user.id}`)
            .then(res => {
                chats = res.data
                if (chats.length < 1) {
                    chatsJSX[this.props.user.id] = <div key={Math.random()} className="chat">
                        <div className="messages">{[]}</div>
                        <input type="text" value={this.state.message} onChange={this.inputMessage} />
                        <button onClick={this.send} >Send</button>
                        </div>
                }



                //Provavelmente temporário; tem que ser capaz de atualizar a página



                chats.forEach(chat => {
                    const chatId = chat.id1 = this.props.user.id ? chat.id2 : chat.id1
                    const messages = chat.messages.map(message => {
                        return <div key={Math.random()} className={`message 
                        ${message.userId === this.props.user.id ? '' : 'another-user-message'}`}>
                            {message.text}</div>
                    })
                    chatsJSX[chatId] = <div key={`${chat.id1}${chat.id2}`} className="chat">
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
        this.updateChatsJSX(this.state.message, this.props.userId)
        this.setState({ message: '' })
    }

    componentDidMount() {
        this.getChats()

        socket.connect()
        socket.emit('online', this.props.user.id, this.props.user.name)
        socket.on('message', (msg, chatId) => this.updateChatsJSX(msg, chatId, true))
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
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Chat)
//adicionar notificações
//comece fazendo um chat simples entre dois usuários e deixe para cuidar do armazenamento e das mensagens offline depois
//deixe os bugs e os ajustes de design para o final
// chat = { profilepicture, name, id1, id2, messages } message: { date, text, userid }