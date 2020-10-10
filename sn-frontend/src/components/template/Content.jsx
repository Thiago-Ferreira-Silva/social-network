import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import './Template.css'
import Home from '../home/Home'
import Auth from '../auth/Auth'

export default class Content extends Component {
    render() {
        return (
            <div className="content">
                    <Link to='/'>Home</Link>
                    <Link to='/auth'>Auth</Link>
                    <Switch>
                        <Route path='/' exact={true} component={Home} />
                        <Route path='/auth' exact={true} component={Auth} />
                    </Switch>
            </div>
        )
    }
}
