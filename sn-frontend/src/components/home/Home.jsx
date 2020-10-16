import './Home.css'
import React, { Component } from 'react'

import { connect } from 'react-redux'

class Home extends Component {

    render() {
        const user = this.props.user
        return (
            <div>
                home
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