import React,  { Component } from 'react';
import remark from 'remark';
import reactRenderer from 'remark-react';
import { Input, Select, Button, Modal } from 'antd';
import '../Detail/style.css';
import './style.css';


const tags = ['首页', 'iOS', 'Python'];

class AdminNewArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title:'',
            content:'',
            tags:[],
            modalVisible: false
        }
    }

    // 正文内容
    onChanges(e) {
        this.setState({ content: e.target.value });
    }

    // 标题输入框
    titleOnChange(e) {
        this.setState({ title: e.target.value });
    };

    //选择标签
    selectTags(value) {
        this.setState({ tags: value })
    };

    //预览
    preView() {
        this.setState({
            modalVisible: true
        })
    };

    //发表
    publishArticle() {

    };

    //保存
    saveArticle() {

    };

    //handleOk
    handleOk() {
        this.setState({
            modalVisible: false
        })
    };

    render() {
        return  (
            <div className="adminNewArticle">
                <h2>新建文章</h2>
                <div className="container">
                    <span className="subTitle">标题</span>
                    <Input
                        className="titleInput"
                        placeholder={'请输入文章标题'}
                        type='text'
                        value={this.state.title}
                        onChange={this.titleOnChange.bind(this)}
                    />
                    <span className="subTitle">正文</span>
                    <textarea
                        className="textArea"
                        value={this.state.content}
                        onChange={this.onChanges.bind(this)}
                    />
                    <span className="subTitle">分类</span>
                    <Select
                        mode='multiple'
                        className='titleInput'
                        placeholder='请选择分类'
                        onChange={this.selectTags.bind(this)}
                        value={this.state.tags}
                    >
                        {
                            tags.map( (item) => (
                                <Select.Option key={item}>{item}</Select.Option>
                            ))
                        }
                    </Select>
                    <div className="bottomContainer">
                        <Button type="primary" onClick={this.publishArticle.bind(this)} className="buttonStyle">发布</Button>
                        <Button type="primary" onClick={this.saveArticle.bind(this)} className="buttonStyle">保存</Button>
                        <Button type="primary" onClick={this.preView.bind(this)} className="buttonStyle">预览</Button>
                    </div>
                </div>

                <Modal
                    visible={this.state.modalVisible}
                    title="文章预览"
                    onOk={this.handleOk.bind(this)}
                    width={'900px'}
                    onCancel={this.handleOk.bind(this)}
                    footer={null}
                >
                    <div className="modalContainer">
                        <div id='preview' className="markdown_body">
                            {remark().use(reactRenderer).processSync(this.state.content).contents}
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default AdminNewArticle;
