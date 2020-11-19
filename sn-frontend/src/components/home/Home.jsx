import './Home.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import NewPost from '../post/NewPost'
import Post from '../post/Post'
import Loading from '../template/Loading'
import { baseApiUrl, notify } from '../../global'

const initialState = {
    posts: [],
    loading: true
}

class Home extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.getPosts = this.getPosts.bind(this)
    }

    getPosts() {
        //temporário
        axios.get(`${baseApiUrl}/posts/${this.props.user.id}`)
            .then(res => {
                const posts = res.data.map(post => {
                    console.log(post)
                    return post ? <Post text={post.text} image={post.image} key={post.id} /> : ''
                })
                this.setState({ posts })
                this.setState({ loading: false })
            })
            .catch(err => notify(err, 'error'))
    }

    componentDidMount() {
        this.getPosts()
        
    }

    render() {
        return (
            <div className="home-container">
                {this.state.loading ?
                    <Loading /> :
                    <div className="home">
                        <NewPost />
                        <ul>{this.state.posts}</ul>
                    </div>
                }
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