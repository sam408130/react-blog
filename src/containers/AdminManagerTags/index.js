import React,  { Component } from 'react';
import './style.css';
import {Tag, Input, Tooltip, Button} from 'antd'
import _ from 'lodash';

class AdminManagerTags extends Component {
    constructor(props){
        super(props);
        this.state={
            tags: ['首页', 'iOS', 'Python'],
            inputVisible: false,
            inputValue: '',
        }
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        // 添加标签
        if (this.state.inputValue.length > 0) {
            this.state.tags.push(this.state.inputValue)
            this.setState({
                tags: this.state.tags,
            });
        }
        this.setState({
            inputVisible: false,
            inputValue: '',
        });
    };

    handleDelete = (removeTag) => {
        _.remove(this.state.tags, tag => tag === removeTag);
        this.setState({ tags: this.state.tags })
    }

    saveInputRef = input => this.input = input;
    render() {
        const { inputVisible, inputValue } = this.state;
        const { tags } = this.state;
        return  (
            <div>
                <h2>标签管理</h2>
                {tags.map( (tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag className="tagStyle" key={index} closable={index !== 0} afterClose={ () => this.handleDelete(tag) }>
                            {isLongTag ? `${tag.slice(0,20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip key={tag} title={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisible && (
                    <Input
                        className="tagStyle"
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 108 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                { !inputVisible && (
                    <Button
                        className="tagStyle"
                        size="small"
                        type="dashed"
                        onClick={this.showInput}
                    >+ New Tag</Button>
                )}
            </div>
        )
    }
}

export default AdminManagerTags;
