import React,  { Component } from 'react';
import style from './style.css';
import { ManagerArticleCell } from '../../components/ManagerArticleCell';
import _ from 'lodash';
import { Modal } from 'antd';
const confirm = Modal.confirm;

const articleList = [{
    title: '文章标题1',
    author: 'sam',
    viewCount: '12',
    time: '2017-10-19',
    _id: '1213123',
    isPublish: '已发布'
},{
    title: '文章标题2',
    author: 'sam',
    viewCount: '132',
    time: '2017-10-19',
    _id: '12131232323',
    isPublish: '草稿'
}];


class AdminManagerArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articleList: articleList
        }
    }

    edit_article = (id) => {
        console.log('编辑文章：',id)
    }

    getArticleDetail = (id) => {
        console.log('跳转到文章详情:',id)
    }

    delete = (id) => {
        var that = this;
        confirm({
          title: '确定要删除该篇文章吗？',
          content: '删除后将无法恢复',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
              _.remove(that.state.articleList, article => article._id === id);
              that.setState({ articleList: that.state.articleList });
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    render() {
        console.log(articleList)
        return  (
            <div>
                <h2>文章列表</h2>
                <div className={style.adminArticleListContainer}>
                    {
                        this.state.articleList.map( (article, index) => (
                            <ManagerArticleCell
                                edit_article={(id) => this.edit_article(id)}
                                history={this.props.history}
                                getArticleDetail={(id) => this.getArticleDetail(id)}
                                delete={(id) => this.delete(id)}
                                key={index}
                                data={article}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default AdminManagerArticle;
