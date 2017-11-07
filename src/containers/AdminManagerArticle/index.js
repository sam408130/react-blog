import PureRenderMixin from 'react-addons-pure-render-mixin'
import React,{ Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import style from './style.css';
import { ManagerArticleCell } from '../../components/ManagerArticleCell';
import { Modal } from 'antd';
const confirm = Modal.confirm;
import { Pagination } from 'antd';
import { actions } from '../../reducers/adminManagerArticle'
import { actions as FrontActions } from '../../reducers/frontReducer'
const { get_article_list,delete_article,edit_article } = actions;
const { get_article_detail } = FrontActions;


class AdminManagerArticle extends Component {
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
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
              this.props.delete_article(id);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    render() {
        return  (
            <div>
                <h2>文章列表</h2>
                <div className={style.adminArticleListContainer}>
                    {
                        this.props.articleList.map( (article, index) => (
                            <ManagerArticleCell
                                edit_article={(id) => this.props.edit_article(id)}
                                history={this.props.history}
                                getArticleDetail={(id) => this.props.getArticleDetail(id)}
                                delete={(id) => this.delete(id)}
                                key={index}
                                data={article}
                            />
                        ))
                    }
                </div>
                <div  className={style.paginationStyle}>
                    <Pagination
                        defaultPageSize={10}
                        onChange={(pageNum)=>{
                            this.props.get_article_list(pageNum);
                        }}
                        current={this.props.pageNum}
                        total={this.props.total}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        if(this.props.articleList.length === 0){
            this.props.get_article_list()
        }
    }

}

AdminManagerArticle.defaultProps={
    articleList:[],
    pageNum:1,
    total:0
};

AdminManagerArticle.defaultProps = {
    articleList:PropTypes.array,
    pageNum:PropTypes.number,
    total:PropTypes.number
};
function mapStateToProps(state) {
    return{
        articleList:state.admin.articles.articleList,
        pageNum:state.admin.articles.pageNum,
        total:state.admin.articles.total
    }
}

function mapDispatchToProps(dispatch) {
    return{
        get_article_list:bindActionCreators(get_article_list,dispatch),
        delete_article:bindActionCreators(delete_article,dispatch),
        edit_article:bindActionCreators(edit_article,dispatch),
        get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminManagerArticle);
