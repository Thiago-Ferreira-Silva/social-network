import './Auth.css'
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { saveUser, checkIfIsAuth } from '../../redux/actions'

import { baseApiUrl, notify } from '../../global'
import Loading from '../template/Loading'

const initialState = {
    showSignUp: false,
    toHome: false,
    loading: false,
    user: {}
}

class Auth extends Component {

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
                this.signIn()
            })
            .catch(err => notify(err, 'error'))
    }

    signIn() {
        this.setState({ loading: true })
        axios.post(`${baseApiUrl}/signin`, this.state.user)
            .then(res => {
                this.props.dispatch(saveUser(res.data))
                this.props.dispatch(checkIfIsAuth(false))
                this.setState({ toHome: true })
            })
            .catch(err => {
                this.setState({ loading: false })
                notify(err, 'error')
            })
    }

    altShowSignUp() {
        const showSignUp = !this.state.showSignUp
        this.setState({ showSignUp })
    }

    onInput(event) {
        const user = this.state.user
        switch (event.target.name) {
            case 'name':
                user.name = event.target.value
                this.setState({ user })
                break
            case 'email':
                user.email = event.target.value
                this.setState({ user })
                break
            case 'password':
                user.password = event.target.value
                this.setState({ user })
                break
            case 'confirmPassword':
                user.confirmPassword = event.target.value
                this.setState({ user })
                break
            default:
        }
    }

    componentDidMount() {
        this.props.dispatch(checkIfIsAuth(true))
    }

    render() {
        if (this.state.toHome) {
            return <Redirect to='/' />
        }
        return (
            <div className="auth">
                { this.state.loading ?
                    <Loading /> :
                    <form className="auth-form">
                        {this.state.showSignUp && <div className="auth-title">Signup</div>}
                        {!this.state.showSignUp && <div className="auth-title">Signin</div>}
                        {this.state.showSignUp && <input name="name" type="text" placeholder="Name" onChange={this.onInput} value={this.state.user.name || ''} />}
                        <input name="email" id="email" type="email" placeholder="Email" onChange={this.onInput} value={this.state.user.email || ''} />
                        <span className="obs">*Don't need to be a real email</span>
                        <input name="password" type="password" placeholder="Password" onChange={this.onInput} value={this.state.user.password || ''} />
                        {this.state.showSignUp && <input name="confirmPassword" type="password" placeholder="Confirm password" onChange={this.onInput} value={this.state.user.confirmPassword || ''} />}
                        {this.state.showSignUp && <button className="btn btn-primary" onClick={this.signUp} >Signup</button>}
                        {!this.state.showSignUp && <button className="btn btn-primary" onClick={this.signIn} >Signin</button>}
                        <div className="auth-link" onClick={this.altShowSignUp}>
                            {this.state.showSignUp && <span>Already have an account? Signin</span>}
                            {!this.state.showSignUp && <span>Don't have an account? Signup</span>}
                        </div>
                    </form>}
            </div>
        )
    }
}


const mapStateToProps = store => ({
    user: store.userState.user
})

export default connect(mapStateToProps)(Auth)