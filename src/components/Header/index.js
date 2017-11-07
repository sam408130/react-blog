import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import style from './style.css';
const logo = require('./logo.png');

export default class Header extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            showLogin: false
        }
    }

    render() {
        return (
            <div className={style.header}>
                <span className={style.logo} onClick={this.props.handleLogin}>
                    <img src={logo} alt='' />
                </span>
                <h1>Sam's Blog</h1>
                <p>If &nbsp; you &nbsp; can't &nbsp; measure &nbsp; it , &nbsp;  you &nbsp; can't &nbsp; improve &nbsp; it</p>
            </div>
        )

    }
}
