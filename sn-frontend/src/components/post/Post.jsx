// se clicar em comentários aparecem em popup e podem ser fechados
//estude a adição de like e unlike nos posts e comentários, e também a adição de vídeos
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Post extends Component {
    render() {
        return (
            <div className="post">
                <div className="text">
                    {this.props.text}
                </div>
                <div className="image">
                    {this.props.image && <img src={this.props.image} alt="" />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({ user: store.userState.user })

export default connect(mapStateToProps)(Post)