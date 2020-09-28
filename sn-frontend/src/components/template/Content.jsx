import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './Template.css'
import Home from '../home/Home'
import Auth from '../auth/Auth'

export default class Content extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact={true} component={Home} />
                    <Route path='/auth' exact={true} component={Auth} />
                </Switch>
            </BrowserRouter>
        )
    }
}
