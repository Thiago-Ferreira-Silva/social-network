import './Home.css'
import React, { Component } from 'react'

import { connect } from 'react-redux'

class Home extends Component {

    render() {
        const user = JSON.stringify(this.props.user)
        return (
            <div>
                home
                <br />
                {user}
            </div>
        )
    }
}

const mapStateToProps = store => ({
    user: store.userState.user
})

export default connect(mapStateToProps)(Home)