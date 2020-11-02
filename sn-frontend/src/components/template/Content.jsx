import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import './Template.css'
import Home from '../home/Home'
import Auth from '../auth/Auth'
import Profile from '../profile/Profile'

class Content extends Component {

    render() {
        return (
            <div className="content">
                    <Switch>
                        <Route path='/' exact={true} component={Home} />
                        <Route path='/auth' exact={true} component={Auth} />
                        <Route path='/profile' exact={true} component={Profile} />
                    </Switch>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Content)