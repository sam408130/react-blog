import React, { Component } from 'react'
import remark from 'remark'
import reactRenderer from 'remark-react'
import homeStyle from '../Home/style.css'
import headerStyle from '../../components/Header/style.css'
import markdown from './style.css'

const articleContent = "## 标题 \n```code``` \n jlkfdsjal"

class Detail extends Component {
    render() {
        return(
            <div className={homeStyle.container}>
                <div className={headerStyle.header}>
                    <h1>文章标题在这里</h1>
                </div>
                <div className={homeStyle.main}>
                    <div id='preview'>
                        <div className={markdown._body}>
                            {remark().use(reactRenderer).processSync(articleContent).contents}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;
