/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Articles from './components/articles/Articles';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar title="Grauniad Reader" icon="far fa-newspaper" />
        <div className="container">
          <Articles />
        </div>
      </div>
    );
  }
}

export default App;
