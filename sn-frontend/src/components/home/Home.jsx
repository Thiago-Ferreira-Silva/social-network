import './Home.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
//import axios from 'axios'

import NewPost from '../post/NewPost'
//import { baseApiUrl, notify } from '../../global'

const initialState = {
    posts: []
}

class Home extends Component {

    state = { ...initialState }

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