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
            .then(res => this.setState({ isAuthenticated: res.data }) )
    }

    render() {
        return (
            <div className="content">
                    <Switch>
                        <Route path='/auth' exact={true} component={Auth} />
                        <Route path='/' exact={true} component={Home} />
                        <Route path='/profile' exact={true} component={Profile} />
                    </Switch>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Content)