import React, { Component } from 'react';
import './style.css';
const logo = require('./logo.svg');

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <span className="logo">
                    <img src={logo} />
                </span>
                <h1>Sam's Blog</h1>
                <p>If &nbsp; you &nbsp; can't &nbsp; measure &nbsp; it , &nbsp;  you &nbsp; can't &nbsp; improve &nbsp; it</p>
            </div>
        )

    }
}
