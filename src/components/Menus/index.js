import React, { Component } from 'react';
import style from './style.css';
import { Menu, } from 'antd';



export default class Menus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: this.props.categories[0]
        }
    }

    handleClick = (e) => {
        console.log('click ', e);
        if(e.key === '首页'){
            this.props.getArticleList('');
        }else{
            this.props.getArticleList(e.key);
        }
        let toPath = e.key === '首页'?'/':'/'+e.key;
        this.setState({
            current: e.key,
        });
        this.props.history.push(toPath);
    }

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                className={style.menucontainer}
            >
                {
                    this.props.categories.map((item,index)=>(
                        <Menu.Item key={item} >
                            {item}
                        </Menu.Item>
                    ))
                }
            </Menu>
        )
    }
}
