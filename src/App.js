
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      pageNo: 4,
      apiKey: process.env.REACT_APP_NEWSAPI
    };
    this.setProgress = (progress) => {
      this.setState({
        progress: progress
      })
    }
  }

  componentDidMount() {
    // console.log('Api Key:', this.state.apiKey); // Logging the value of the env variable
  }

  render() {
    return (

      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path='/' element={<News setProgress={this.setProgress} apiKey={this.state.apiKey} key='general' pageSize={this.state.pageNo} country='us' category='general' />}></Route>
            <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.state.apiKey} key='business' pageSize={this.state.pageNo} country='us' category='business' />}></Route>
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.state.apiKey} key='entertainment' pageSize={this.state.pageNo} country='us' category='entertainment' />}></Route>
            <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.state.apiKey} key='health' pageSize={this.state.pageNo} country='us' category='health' />}></Route>
            <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.state.apiKey} key='science' pageSize={this.state.pageNo} country='us' category='science' />}></Route>
            <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.state.apiKey} key='sports' pageSize={this.state.pageNo} country='us' category='sports' />}></Route>
            <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.state.apiKey} key='technology' pageSize={this.state.pageNo} country='us' category='technology' />}></Route>
          </Routes>
        </Router>
      </div>

    )
  }
}

