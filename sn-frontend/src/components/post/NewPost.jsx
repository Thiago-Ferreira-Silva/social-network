import React, { Component } from 'react'
import { connect } from 'react-redux'

class NewPost extends Component {
    render () {
        return (
            <div className="new-post"></div>
        )
    } 
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(NewPost)