import React, { Component } from 'react'
import ArticleListCell from '../ArticleListCell'

const items = [{
    key: '123',
    title: '标题',
    time: '2017-10-29',
    viewCount: '100',
    commentCount: '23'
},{
    key: '123332',
    title: '标题2',
    time: '2017-10-29 12:00:00',
    viewCount: '10',
    commentCount: '123'
}];

export default class ArticleList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { tags } = this.props;
        return(
            <div>
                {
                    items.map((item,index) => (
                        <ArticleListCell history={this.props.history} key={index} data={item} tags={tags} />
                    ))
                }
            </div>
        )

    }
}
