import './Home.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import NewPost from '../post/NewPost'
import Post from '../post/Post'
import Loading from '../template/Loading'
import { baseApiUrl, notify } from '../../global'
import AnotherUseProfile from '../profile/AnotherUseProfile'

const initialState = {
    posts: [],
    loading: true,
    offset: 0,
    loadMore: true
}

class Home extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.getPosts = this.getPosts.bind(this)
        this.loadMore = this.loadMore.bind(this)
        this.loadTenMore = this.loadTenMore.bind(this)
        this.loadOneMore = this.loadOneMore.bind(this)
    }

    getPosts(url) {
        axios.get(url)
            .then(res => {
                const posts = res.data.map(post => {
                    const date = new Date(post.date).toLocaleString()
                    return post ? <Post text={post.text} image={post.image} date={date} likes={post.likes} comments={post.comments} userId={post.user_id} id={post.id} delete={this.getPosts} key={post.id} /> : ''
                })
                this.setState({ 
                    posts,
                    loading: false ,
                    offset: 10
                })
                
            })
            .catch(err => notify(err, 'error'))
    }

    loadMore(limit = 10, offset = 0) {
        axios.get(`${baseApiUrl}/posts?limit=${limit}&offset=${offset}`)
            .then( res => {
                const posts = this.state.posts
                const newPosts = res.data.map(post => {
                    const date = new Date(post.date).toLocaleString()
                    return post ? <Post text={post.text} image={post.image} date={date} likes={post.likes} comments={post.comments} userId={post.user_id} id={post.id} delete={this.getPosts} key={post.id} /> : ''
                })
                if (newPosts.length < limit) this.setState({ loadMore: false })
                newPosts.forEach(post => limit === 1 ? posts.unshift(post) : posts.push(post))
                this.setState({
                    posts,
                    offset: this.state.offset + limit
                })
            })
            .catch(err => notify(err, 'error'))
    }

    loadTenMore() {
        this.loadMore(10, this.state.offset)
    }

    loadOneMore() {
        this.loadMore(1)
    }

    componentDidMount() {
        if (this.props.home) this.getPosts(`${baseApiUrl}/posts?limit=10&offset=0`)
        if (this.props.yourPosts) this.getPosts(`${baseApiUrl}/posts/${this.props.user.id}?limit=10&offset=0`)
        if (this.props.anotherUser) this.getPosts(`${baseApiUrl}/posts/${this.props.location.state.id}?limit=10&offset=0`)
    }//precisa atualizar quando muda a função e refazer o loadMore para se adaptar aos novos casos

    render() {
        return (
            <div className="home-container">
                {this.state.loading ?
                    <Loading /> :
                    <div className="home">
                        {this.props.anotherUser ?
                        <AnotherUseProfile { ...this.props.location.state } />:
                        <NewPost update={this.loadOneMore} />
                        }
                        <ul>{this.state.posts}</ul>
                        {this.state.loadMore && 
                            <button className="load-more" onClick={this.loadTenMore} >Load more</button> }
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

//use o redux para alguma coisa e faça o chat com socket logo