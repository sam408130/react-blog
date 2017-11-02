import React, { Component } from 'react';
import style from './style.css';
import Header from '../../components/Header';
import Menus from '../../components/Menus';
import ArticleList from '../../components/ArticleList'


class Home extends Component {

    render() {
        const { tags } = this.props;
        return (
            <div className={style.container}>
                <Header />
                <div className={style.nav}>
                    <Menus history={this.props.history} />
                </div>
                <div className={style.main}>
                    <ArticleList history={this.props.history} tags={tags} />
                </div>
            </div>
        )
    }
};

export default Home;
