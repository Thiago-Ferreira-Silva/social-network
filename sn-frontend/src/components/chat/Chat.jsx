import './Chat.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'

const initialState = {
    message: ''
}

class Chat extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.inputMessage = this.inputMessage.bind(this)
        this.send = this.send.bind(this)
    }

    inputMessage(event) {
        this.setState({ message: event.target.value })
    }

    send() {
        this.props.send && this.props.send(this.state.message)
        this.setState({ message: '' })
    }

    render() {
        const chat = this.props.chats[this.props.chatId]
        return (
            <div className="chat">
                <div className="messages">{ chat.messages }</div>
                <input type="text" value={this.state.message} onChange={this.inputMessage} />
                <button onClick={this.send} >Send</button>
            </div>
        )
    }
}
//ainda não está atualizando
const mapStateToProps = store => ({ 
    user: store.userState.user,
    chats: store.chatsState.chats
 })

export default connect(mapStateToProps)(Chat)