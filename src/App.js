/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import ArticleItem from './components/articles/ArticleItem';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar title="Grauniad Reader" icon="far fa-newspaper" />
        <ArticleItem />
      </div>
    );

    // USING CREATE ELEMENT
    // return React.createElement(
    //   "div",
    //   { className: "App" },
    //   React.createElement("h1", null, "Hello from React!")
    // );
  }
}

export default App;
