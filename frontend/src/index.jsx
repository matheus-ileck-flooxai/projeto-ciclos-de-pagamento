import React from 'react'
import ReactDom from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import App from './main/app'
import reducers from './main/reducers'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(promise,multi,thunk)(createStore)(reducers, devTools)
ReactDom.render(
    <Provider store={store}>
        <App  class="wrapper"/>
    </Provider>,
    document.getElementById('app'))