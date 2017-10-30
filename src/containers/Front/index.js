import React, {Component} from 'react'
import {
    Route,
    Switch
} from 'react-router-dom'
import Home from '../Home'
import Detail from '../Detail'
import NotFound from '../NotFound'
import { BackTop } from 'antd'

class Front extends Component {

    render() {
        const {url} = this.props.match;
        return(
            <div>
                <div >
                    <Switch>
                        <Route exact path={url} component={Home}/>
                        <Route path={`/detail/:id`} component={Detail}/>
                        <Route path={`/:tag`} component={Home}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
                <BackTop />
            </div>
        )
    }
}

export default Front;
