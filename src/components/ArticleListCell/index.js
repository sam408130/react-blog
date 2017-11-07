import React, { Component } from 'react'
import style from './style.css'

export default class ArticleListCell extends Component {

    render() {
        return(
            <div className={style.container} onClick={
                () => {
                    this.props.history.push(`/detail/${this.props.data._id}`, {id: this.props.data._id});
                    this.props.getArticleDetail(this.props.data._id)
                }
              }
            >
                <div className={style.content}>
                    <div className={style.title}>
                        <h2>{this.props.data.title}</h2>
                    </div>
                    <p className={style.summary}>
                        {this.props.data.desc}
                    </p>
                    <div>
                        <div className={style.info}>
                            <div className={style.tag}>
                                <img src={require('./calendar.png')} alt="发表日期"/>
                                <div>{this.props.data.time}</div>
                            </div>
                            <div className={style.tag}>
                                <img src={require('./views.png')} alt="阅读数"/>
                                <div>{this.props.data.viewCount}</div>
                            </div>
                            <div className={style.tag}>
                                <img src={require('./comments.png')} alt="评论数"/>
                                <div>{this.props.data.commentCount}</div>
                            </div>
                        </div>
                        <span className={style.lastSpan}>
                            阅读全文
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
