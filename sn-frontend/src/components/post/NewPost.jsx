import React, { Component } from 'react'
import { connect } from 'react-redux'

const initialState = {
    text: null,
    image: null
}

class NewPost extends Component {

    state = { ...initialState }

    render () {
        return (
            <div className="new-post">
                <textarea maxLength="600" id="text" className="new-post-text" defaultValue={ this.state.text || 'Escreva algo aqui'} ></textarea>
            </div>
        )
    } 
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(NewPost)