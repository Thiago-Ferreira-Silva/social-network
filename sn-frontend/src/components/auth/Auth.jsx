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
        this.altShowSignUp = this.altShowSignUp.bind(this)
    }

    signUp() {
        console.log('signup')
    }

    signIn() {
        console.log('signin')
    }

    altShowSignUp() {
        const showSignUp = !this.state.showSignUp
        this.setState({showSignUp})
    }

    render() {
        return (
            <div className="auth">
                <div className="auth-form">
                    {this.state.showSignUp && <div className="auth-title">Signup</div>}
                    {!this.state.showSignUp && <div className="auth-title">Signin</div>}
                    {this.state.showSignUp && <input type="text" placeholder="Name" />}
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    {this.state.showSignUp && <input type="password" placeholder="Confirm password" />}
                    {this.state.showSignUp && <button className="btn btn-primary" onClick={this.signUp} >Signup</button>}
                    {!this.state.showSignUp && <button className="btn btn-primary" onClick={this.signIn} >Signin</button>}
                    <a href onClick={this.altShowSignUp}>
                        {this.state.showSignUp && <span>Already have an account? Signin</span>}
                        {!this.state.showSignUp && <span>Don't have an account? Signup</span>}
                    </a>
                </div>
            </div>
        )
    }
}