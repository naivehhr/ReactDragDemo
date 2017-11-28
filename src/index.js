import 'babel-polyfill'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// import { App } from './App'
import App from './CommonApp'
import ConfigureStore from './ConfigureStore'


const store = ConfigureStore()
ReactDOM.render(
    <Provider store={store}>
    <App />
  </Provider>, document.querySelector('div#app')
)
