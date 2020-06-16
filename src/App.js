/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
/* eslint no-console: ["error", {"allow" : ["error"] }] */

import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Articles from './components/articles/Articles';
import Search from './components/articles/Search';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await axios
      .get(
        `https://content.guardianapis.com/search?q=liverpool&page-size=20&&show-fields=thumbnail,trailText&section=football&api-key=${process.env.REACT_APP_GUARDIAN_API_KEY}`,
      )
      .catch((err) => console.error(err));
    this.setState({ articles: response.data.response.results, isLoading: false });
  }

  searchArticles = async (text) => {
    this.setState({ isLoading: true });
    const response = await axios
      .get(
        `https://content.guardianapis.com/search?q=liverpool ${text}&page-size=20&&show-fields=thumbnail,trailText&section=football&api-key=${process.env.REACT_APP_GUARDIAN_API_KEY}`,
      )
      .catch((err) => console.error(err));
    // console.log(response.data.response.results);
    this.setState({ articles: response.data.response.results, isLoading: false });
  };

  clearArticles = (e) => {
    e.preventDefault();
    this.setState({ articles: [] });
  };

  render() {
    const { isLoading, articles } = this.state;
    const { searchArticles, clearArticles } = this;
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search
            searchArticles={searchArticles}
            clearArticles={clearArticles}
            showClear={articles.length > 0}
          />
          <Articles isLoading={isLoading} articles={articles} />
        </div>
      </div>
    );
  }
}

export default App;
