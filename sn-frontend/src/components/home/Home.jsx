import './Home.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {

    render() {
        const user = this.props.user
        return (
            <div>
                <h1>Home</h1>
                <br />
                {user.name}
            </div>
        )
    }
}

const mapStateToProps = store => ({
    user: store.userState.user
})
//temporário

export default connect(mapStateToProps)(Home)