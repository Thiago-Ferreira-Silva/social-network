// se clicar em comentários aparecem em popup e podem ser fechados
//estude a adição de like e unlike nos posts e comentários, e também a adição de vídeos
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Post extends Component {
    render() {
        return (
            <h1>Post</h1>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Post)