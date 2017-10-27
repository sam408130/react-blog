import React, { Component } from 'react'
import remark from 'remark'
import reactRenderer from 'remark-react'
import '../Home/style.css'
import '../../components/Header/style.css'
import './style.css'

const articleContent = "## 标题 \n```code``` \n jlkfdsjal"

class Detail extends Component {
    render() {
        return(
            <div className="h_container">
                <div className="header">
                    <h1>文章标题在这里</h1>
                </div>
                <div className="main">
                    <div id='preview' className="main">
                        <div className="markdown_body">
                            {remark().use(reactRenderer).processSync(articleContent).contents}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;
