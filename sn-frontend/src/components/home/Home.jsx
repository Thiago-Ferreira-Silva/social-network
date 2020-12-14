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
    offset: 0
}

class Home extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.getPosts = this.getPosts.bind(this)
        this.loadMore = this.loadMore.bind(this)
    }

    getPosts() {
        axios.get(`${baseApiUrl}/posts?limit=10&offset=0`)
            .then(res => {
                const posts = res.data.map(post => {
                    const date = new Date(post.date).toLocaleString()
                    return post ? <Post text={post.text} image={post.image} date={date} likes={post.likes} comments={post.comments} userId={post.user_id} id={post.id} delete={this.getPosts} key={post.id} /> : ''
                })
                this.setState({ 
                    posts,
                    loading: false 
                })
                
            })
            .catch(err => notify(err, 'error'))
    }

    loadMore(limit = 10) {
        axios.get(`${baseApiUrl}/posts?limit=${limit}&offset=${this.state.offset}`)
            .then( res => {
                const newPosts = res.data.map(post => {
                    const date = new Date(post.date).toLocaleString()
                    return post ? <Post text={post.text} image={post.image} date={date} likes={post.likes} comments={post.comments} userId={post.user_id} id={post.id} delete={this.getPosts} key={post.id} /> : ''
                })
                this.setState({
                    posts: this.state.posts + newPosts,
                    offset: this.state.offset + limit
                })
            })
            .catch(err => notify(err, 'error'))
    }

    componentDidMount() {
        this.getPosts()//faça funcionar
    }

    render() {
        return (
            <div className="home-container">
                {this.state.loading ?
                    <Loading /> :
                    <div className="home">
                        {this.props.anotherUser ?
                        <AnotherUseProfile { ...this.props.location.state } />:
                        <NewPost update={this.loadMore(1)} />
                        }
                        <ul>{this.state.posts}</ul>
                        <button className="load-more" onClick={this.loadMore} >Load more</button>{/*está dando muita merda */}
                    </div>
                }
            </div>
        )
    }//não está buscando os posts quando vai do perfil de alguém para a home
}//arrumo o estilo

const mapStateToProps = store => ({
    user: store.userState.user
})

export default connect(mapStateToProps)(Home)

//use o redux para alguma coisa e faça o chat com socket logo
//isso vai precisar de uma lógica bem complexa para mostrar os posts
//e também deve ter meios de selecionar quais irão aparecer
//crie um schdule para atualizar periodicamente likes e comentários nos posts, os posts no home, ou qualquer outra coisa na qual isso pareça caber