import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import Front from './containers/Front';
import Admin from './containers/Admin';
import NotFound from './containers/NotFound';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


ReactDOM.render(

    <Router>
        <div>
            <Switch>
                <Route path='/404' component={NotFound}/>
                <Route path='/admin' component={Admin} />
                <Route component={Front} />
            </Switch>
        </div>
    </Router>
    , document.getElementById('root')

);
