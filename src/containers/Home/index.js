import React, { Component } from 'react';
import './style.css';
import Header from '../../components/Header/Header';
import Menus from '../../components/Menus/Menus';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <div className="nav">
                    <Menus />
                </div>
                <div className="main">
                    这里是文章列表
                </div>
            </div>
        )
    }
};

export default Home;
