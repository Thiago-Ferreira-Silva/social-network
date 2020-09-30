import './Auth.css'
import React, { Component } from 'react'

const initialState = {
    showSignUp: false,
    user: {}
}

export default class Auth extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.signIn = this.signIn.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    signUp() {

    }

    signIn() {

    }

    render() {
        return (
            <div className="auth">
                <div className="auth-form">
                    <input type="text" placeholder="Name"/>
                    <input type="text" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Confirm password"/>
                    <button onClick={this.signUp} >Signup</button>
                    <button onClick={this.signIn} >Signin</button>
                    <a href></a>
                </div>
            </div>
        )
    }
}