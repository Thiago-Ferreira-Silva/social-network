import './Main.css'
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
        this.deletePost = this.deletePost.bind(this)
        this.mountMain = this.mountMain.bind(this)
    }

    getPosts(url) {
        axios.get(url)
            .then(res => {
                const posts = res.data.map(post => {
                    const date = new Date(post.date).toLocaleString()
                    return post ? <Post text={post.text} image={post.image}
                        date={date} likes={post.likes} comments={post.comments} userId={post.user_id}
                        id={post.id} refresh={this.refresh} delete={this.deletePost} key={post.id} /> : ''
                })
                this.setState({
                    posts,
                    loading: false,
                    offset: posts.length
                })

            })
            .catch(err => notify(err, 'error'))
    }

    loadMore(limit = 10, offset = 0, id = null) {
        axios.get(`${baseApiUrl}/posts${id ? `/${id}` : ''}?limit=${limit}&offset=${offset}`)
            .then(res => {
                const posts = this.state.posts
                const newPosts = res.data.map(post => {
                    const date = new Date(post.date).toLocaleString()
                    return post ? <Post text={post.text} image={post.image}
                        date={date} likes={post.likes} comments={post.comments} userId={post.user_id}
                        id={post.id} refresh={this.refresh} delete={this.deletePost} key={post.id} /> : ''
                })
                if (newPosts.length < limit) this.setState({ loadMore: false })
                newPosts.forEach(post => limit === 1 ? posts.unshift(post) : posts.push(post))
                this.setState({
                    posts,
                    offset: this.state.offset + newPosts.length
                })
            })
            .catch(err => notify(err, 'error'))
    }

    loadTenMore() {
        switch (this.props.usingFor) {
            case 'home' :
                this.loadMore(10, this.state.offset)
                break
            case 'yourPosts' :
                this.loadMore(10, this.state.offset, this.props.user.id)
                break
            case 'anotherUser' :
                this.loadMore(10, this.state.offset, this.props.location.state.id)
                break
            default:
        }
    }

    loadOneMore() {
        this.loadMore(1)
    }

    async deletePost() {
        const offset = this.state.offset
        await this.setState({ ...initialState, posts: [] })
        await this.loadMore(offset, 0)
        this.setState({ loading: false })
    }

    mountMain() {
        switch (this.props.usingFor) {
            case 'home' :
                this.getPosts(`${baseApiUrl}/posts?limit=10&offset=0`)
                break
            case 'yourPosts' :
                this.getPosts(`${baseApiUrl}/posts/${this.props.user.id}?limit=10&offset=0`)
                break
            case 'anotherUser' :
                this.getPosts(`${baseApiUrl}/posts/${this.props.location.state.id}?limit=10&offset=0`)
                break
            default:
        }
    }

    componentDidMount() {
        this.mountMain()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.usingFor !== this.props.usingFor) this.mountMain()
    }

    render() {
        return (
            <div className="main-container">
                {this.state.loading ?
                    <Loading /> :
                    <div className="main">
                        {this.props.usingFor === 'anotherUser' ?
                            <AnotherUseProfile {...this.props.location.state} /> :
                            <NewPost update={this.loadOneMore} />
                        }
                        <ul>{this.state.posts}</ul>
                        {this.state.loadMore &&
                            <button className="load-more" onClick={this.loadTenMore} >Load more</button>}
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