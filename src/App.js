import './App.css'
import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 6
  country = 'in'
  apikey = process.env.REACT_APP_NEWS_API
  state = {
    progress: 0,
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            loaderSpeed={450}
            height={3}
            color="#f11946"
            progress={this.state.progress}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="general"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="entertainment"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="health"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="science"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="sports"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  apikey={this.apikey}
                  key="technology"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    )
  }
}
