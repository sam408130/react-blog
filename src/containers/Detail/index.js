import React, { Component } from 'react'
import homeStyle from '../Home/style.css'
import headerStyle from '../../components/Header/style.css'
import markdown from './style.css'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import remark from 'remark'
import {connect} from 'react-redux'
import {actions} from "../../reducers/frontReducer";
const {get_article_detail} = actions;
import reactRenderer from 'remark-react'
import Footer from '../../components/Footer'
import style from './style.css'

class Detail extends Component {

    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const {articleContent,title,author,viewCount,commentCount,time} = this.props;
        return(
            <div className={style.container}>
                <div className={style.header}>
                    <h1>{title}</h1>
                </div>
                <div className={style.main}>
                    <div id='preview' >
                        <div className={style.markdown_body}>
                            {remark().use(reactRenderer).processSync(articleContent).contents}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
    componentDidMount() {
        this.props.get_article_detail(this.props.location.state.id);
    }
}


function mapStateToProps(state) {
    const {content,title,author,viewCount,commentCount,time} = state.front.articleDetail;
    return{
        articleContent:content,
        title,
        author,
        viewCount,
        commentCount,
        time
    }
}

function mapDispatchToProps(dispatch) {
    return{
        get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);
