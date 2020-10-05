import './Auth.css'
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

//import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'
import { saveUser } from '../../redux/actions'

import { userKey, baseApiUrl } from '../../global'

const initialState = {
    showSignUp: false,
    toHome: false,
    user: {}
}

export default class Auth extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.signIn = this.signIn.bind(this)
        this.signUp = this.signUp.bind(this)
        this.altShowSignUp = this.altShowSignUp.bind(this)
        this.onInput = this.onInput.bind(this)
    }

    signUp() {
        axios.post(`${baseApiUrl}/signup`, this.state.user)
            .then(() => {
                this.setState({ user: {} })
                this.setState({ showSignUp: false })
            })
            .catch( err => console.log(err))
    }

    signIn() {
        axios.post(`${baseApiUrl}/signin`, this.state.user)
            .then(res => {
                localStorage.setItem(userKey, JSON.stringify(res.data))
                saveUser(this.state.user)
                this.setState({ toHome: true })
            })
            .catch( err => console.log(err))
    }

    altShowSignUp() {
        const showSignUp = !this.state.showSignUp
        this.setState({showSignUp})
    }

    onInput(event) {
        const user = this.state.user
        switch (event.target.name) {
            case 'name' :
                user.name = event.target.value
                this.setState({ user })
                break
            case 'email' :
                user.email = event.target.value
                this.setState({ user })
                break
            case 'password' :
                user.password = event.target.value
                this.setState({ user })
                break
            case 'confirmPassword' :
                user.confirmPassword = event.target.value
                this.setState({ user })
                break
            default:
        }
    }

    render() {
        if (this.state.toHome) {
            return <Redirect to='/home' />
        }
        return (
            <div className="auth">
                <div className="auth-form">
                    {this.state.showSignUp && <div className="auth-title">Signup</div>}
                    {!this.state.showSignUp && <div className="auth-title">Signin</div>}
                    {this.state.showSignUp && <input name="name" type="text" placeholder="Name" onChange={this.onInput} value={this.state.user.name} />}
                    <input name="email" id="email" type="text" placeholder="Email" onChange={this.onInput} value={this.state.user.email || ''} />
                    <input name="password" type="password" placeholder="Password" onChange={this.onInput} value={this.state.user.password || ''} />
                    {this.state.showSignUp && <input name="confirmPassword" type="password" placeholder="Confirm password" onChange={this.onInput} value={this.state.user.confirmPassword} />}
                    {this.state.showSignUp && <button className="btn btn-primary" onClick={this.signUp} >Signup</button>}
                    {!this.state.showSignUp && <button className="btn btn-primary" onClick={this.signIn} >Signin</button>}
                    <a href="true" onClick={this.altShowSignUp}>
                        {this.state.showSignUp && <span>Already have an account? Signin</span>}
                        {!this.state.showSignUp && <span>Don't have an account? Signup</span>}
                    </a>
                </div>
            </div>
        )
    }
}

//o que vem daqui pra frente é necessário?

/*
const mapStateToProps = store => ({
    user: store.userState.user
})

const mapDispatchToProps = dispatch =>
    bindActionCreators({ saveUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Auth)

*/
//veja se está funcionando