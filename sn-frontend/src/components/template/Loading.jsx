import './Template.css'
import React, { Component } from 'react'

export default class Loading extends Component {
    render() {
        return (
            <div className="loading-container">
                <div className="loading"></div>
            </div>
        )
    }
}