import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { baseApiUrl } from '../../global'

import './Template.css'
import Main from '../main/Main'
import Auth from '../auth/Auth'
import Profile from '../profile/Profile'

const initialState = { isAuthenticated: false }

class Content extends Component {

    state = { ...initialState }

    validateToken = token => {
        axios.post(`${baseApiUrl}/validateToken`, { token })
            .then(res => this.setState({ isAuthenticated: res.data }))
    }
    //é possível fazer a validação do token usando o hook componentDidMount, mas eu acho que não será necessário, pois todos os componentes parecem fazer requisições para o backend (até o momento)

    render() {
        return (
            <div className="content">
                <Switch>
                    <Route path='/auth' exact={true} render={() => <Auth />} />
                    <Route path='/' exact={true} render={(props) =>
                        <Main {...props} usingFor={'home'} />} />
                    <Route path='/your-posts' exact={true} render={(props) =>
                        <Main {...props} usingFor={'yourPosts'} />} />
                    <Route path='/user' exact={true} render={(props) =>
                        <Main {...props} usingFor={'anotherUser'} />} />
                    <Route path='/profile' exact={true} render={() => <Profile />} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Content)