import './Chat.css'
import pictureDefault from '../../assets/profile_default.png'

import React, { Component } from 'react'
import { connect } from 'react-redux'

const initialState = {
    message: '',
    messages: []
}

class Chat extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.addMessageToChat = this.addMessageToChat.bind(this)
        this.inputMessage = this.inputMessage.bind(this)
        this.send = this.send.bind(this)
    }

    addMessageToChat(msg, anotherUser = false) {
        const message = <div key={Math.random()} className={`message 
                            ${anotherUser ? 'another-user-message' : ''}`}>
            {msg}</div>

        const messages = this.state.messages

        messages.unshift(message)

        const messagesDiv = document.getElementById('messages')
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        this.setState({ messages })
    }

    inputMessage(event) {
        this.setState({ message: event.target.value })
    }

    send() {
        this.props.socket.emit('message', this.state.message, this.props.chatId,
            this.props.user.id)

        this.addMessageToChat(this.state.message)

        this.setState({ message: '' })
    }

    componentDidMount() {
        this.setState({ messages: this.props.messages })

        this.props.socket.on('message', (msg, chatId) => {
            if (chatId === this.props.chatId) this.addMessageToChat(msg, true)
        })
    }

    render() {
        return (
            <div className="chat">
                <div className="chat-user">
                    <div className="chat-user-image">
                        {this.props.profilePicture ?
                            <img src={this.props.profilePicture} alt="chat-user" /> :
                            <img src={pictureDefault} alt="chat-user" />
                        }
                    </div>
                    <div className="chat-user-name">
                        {this.props.name}
                    </div>
                </div>
                <div className="messages" id='messages'>{this.state.messages}</div>
                <div className="chat-form">
                    <textarea cols="30" rows="10" value={this.state.message} onChange={this.inputMessage}></textarea>
                    <button className='btn btn-primary' onClick={this.send} >Send</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    user: store.userState.user
})

export default connect(mapStateToProps)(Chat)