import './Home.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewPost from '../post/NewPost'

class Home extends Component {

    render() {
        return (
            <div className="home">
                <NewPost />
            </div>
        )
    }
}

const mapStateToProps = store => ({
    user: store.userState.user
})

export default connect(mapStateToProps)(Home)

//isso vai precisar de uma lógica bem complexa para mostrar os posts
//e também deve ter meios de selecionar quais irão aparecer