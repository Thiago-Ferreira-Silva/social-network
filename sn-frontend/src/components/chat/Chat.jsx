import './Chat.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'

const initialState = {
    messages: [],
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
        //precisa de muitas atualizações
        this.props.send && this.props.send(this.state.message)
        //não funciona, talvez precise conectar o socket em cada chat
        this.setState({ message: '' })
    }

    render() {
        return (
            <div key={`${this.props.id1}${this.props.id2}`} className="chat">
                <div className="messages"></div>
                <input type="text" value={this.state.message} onChange={this.inputMessage} />
                <button onClick={this.send} >Send</button>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Chat)