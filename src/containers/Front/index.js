import React, {Component} from 'react'
import {
    Route,
    Switch
} from 'react-router-dom'
import Home from '../Home'
import { BackTop } from 'antd'

class Front extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {url} = this.props.match;
        return(
            <div>
                <div >
                    <Switch>
                        <Route exact path={url} component={Home}/>
                        <Route path={`/:tag`} component={Home}/>
                    </Switch>
                </div>
                <BackTop />
            </div>
        )
    }
}

export default Front;
