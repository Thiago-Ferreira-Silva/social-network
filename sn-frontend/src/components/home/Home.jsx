import './Home.css'
import React, { Component } from 'react'

import { connect } from 'react-redux'

class Home extends Component {
    state = { user: {} }

    render() {

        const { user } = this.state
        console.log(user)
        return (
            <div>
                <input type="text" placeholder={this.state.user}/>
            </div>
        )
    }
}

 const mapStateToProps = store => ({
     user: store.userState.user
 })

export default connect(mapStateToProps)(Home)