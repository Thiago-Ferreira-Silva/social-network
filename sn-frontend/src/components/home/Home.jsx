import './Home.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import NewPost from '../post/NewPost'
import Post from '../post/Post'
import { baseApiUrl, notify } from '../../global'

const initialState = {
    posts: []
}

class Home extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.getPosts = this.getPosts.bind(this)
    }

    getPosts() {
        //temporário
        //alguns posts estão vindo como null
        axios.get(`${baseApiUrl}/posts/${this.props.user.id}`)
            .then(res => {
                const posts = res.data.map(post => {
                    return post ? <Post text={post.text} image={post.image} key={post.id} /> : ''
                })
                this.setState({ posts })
            })
            .catch(err => notify(err, 'error'))
    }

    componentDidMount() {
        this.getPosts()
    }

    render() {
        return (
            <div className="home">
                <NewPost />
                <ul>{this.state.posts}</ul>
                {/*colocar o componente de loading enquanto os posts não chegam*/}
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