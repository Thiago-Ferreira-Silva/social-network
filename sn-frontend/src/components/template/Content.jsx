import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { baseApiUrl } from '../../global'

import './Template.css'
import Home from '../home/Home'
import Auth from '../auth/Auth'
import Profile from '../profile/Profile'

const initialState = { isAuthenticated: false }

class Content extends Component {

    state = { ...initialState }

    validateToken = token => {
        axios.post(`${baseApiUrl}/validateToken`, { token })
            .then(res => this.setState({ isAuthenticated: res.data }))
    }

    render() {
        return (
            <div className="content">
                <Switch>
                    <Route path='/auth' exact={true} render={() => <Auth />} />
                    <Route path='/' exact={true} render={(props) =>
                        <Home {...props} home={true} />} />
                    <Route path='/your-posts' exact={true} render={(props) =>
                        <Home {...props} yourPosts={true} />} />
                    <Route path='/user' exact={true} render={(props) =>
                        <Home {...props} user={true} />} />
                    <Route path='/profile' exact={true} render={() => <Profile />} />
                    {/* Criar as rotas, passar as informações para AnotherUserProfile através do Link e refazer o componente Home para que ele possa ser o Home de fato, o componente no qual o usuário vê seus posts e o componente para ver os posts de outro usuário; ainda usando alguma coisa de props apenas para identificar qual é qual e três rotas diferentes com o mesmo componente; o paginador também deve ser em parte configurado por aqui */}
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Content)