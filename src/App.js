import React, { Component } from 'react';
import Nav from './components/common/Nav'
import Routes from './components/route/index'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import {message} from 'antd'

Component.prototype.$tool = {
  exchangeArr (arr, i, j) {
    if( i === j) return false
    let cache = arr[i]
    arr[i] = arr[j]
    arr[j] = cache
  },
  delayMethod (time) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, time)
    })
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    message.config({
      duration: 1,
      maxCount: 3
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div style={{ marginTop: 10 }}>
            <div style={{ position: 'absolute' }}>
              <Nav/>
            </div>
            <div style={{ marginLeft: 270 }}>
              <Routes/>
            </div>
          </div>
          
        </div>
      </Router>
    );
  }
}

export default App;
