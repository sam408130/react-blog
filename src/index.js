import React from 'react'
import IndexApp from './containers'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import configureStore from './configureStore'
import 'antd/dist/antd.css';
import style from './index.css';

const store = configureStore();

render(
    <AppContainer >
        <Provider store={store}>
            <IndexApp/>
        </Provider>
    </AppContainer>
    ,
    document.getElementById('root')
);

if(module.hot && process.env.NODE_ENV !== 'production'){
    module.hot.accept();
}
