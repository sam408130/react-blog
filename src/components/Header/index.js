import React, { Component } from 'react';
import style from './style.css';
const logo = require('./logo.svg');

export default class Header extends Component {
    render() {
        return (
            <div className={style.header}>
                <span className={style.logo}>
                    <img src={logo} alt='' />
                </span>
                <h1>Sam's Blog</h1>
                <p>If &nbsp; you &nbsp; can't &nbsp; measure &nbsp; it , &nbsp;  you &nbsp; can't &nbsp; improve &nbsp; it</p>
            </div>
        )

    }
}
