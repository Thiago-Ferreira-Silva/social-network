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
//crie o recurso de fazer posts parecidos com os do twitter

export default connect(mapStateToProps)(Home)