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
    loading: true
}

class Home extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.getPosts = this.getPosts.bind(this)
    }

    getPosts() {
        //faça as alterações aqui primeiro e só depois no componente post
        const id = this.props.anotherUser ? this.props.location.state.id : this.props.user.id
        axios.get(`${baseApiUrl}/posts/${id}`)
            .then(res => {
                //talvez colocar isso como um método separado
                //ajustar o quanto da data vai aparecer
                const posts = res.data.map(post => {
                    const date = new Date(post.date).toLocaleString()
                    return post ? <Post text={post.text} image={post.image} date={date} userId={post.user_id} key={post.id} /> : ''
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
                        {this.props.anotherUser ?
                        <AnotherUseProfile { ...this.props.location.state } />:
                        <NewPost update={this.getPosts} />
                        }
                        <ul>{this.state.posts}</ul>
                    </div>
                }
            </div>
        )
    }//não está buscando os posts quando vai do perfil de alguém para a home
}

const mapStateToProps = store => ({
    user: store.userState.user
})

export default connect(mapStateToProps)(Home)

//use o redux para alguma coisa e faça o chat com socket logo
//isso vai precisar de uma lógica bem complexa para mostrar os posts
//e também deve ter meios de selecionar quais irão aparecer
//crie um schdule para atualizar periodicamente likes e comentários nos posts, os posts no home, ou qualquer outra coisa na qual isso pareça caber