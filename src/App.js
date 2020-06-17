/* eslint-disable max-len */
// /* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Articles from './components/articles/Articles';
import Article from './components/articles/Article';
import Search from './components/articles/Search';
import Alert from './components/layout/Alert';
import './App.css';

let guardianApiKey;

if (process.env.NODE_ENV !== 'production') {
  guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
} else {
  guardianApiKey = process.env.GUARDIAN_API_KEY;
}
axios.defaults.baseURL = 'https://content.guardianapis.com';
axios.defaults.headers.common['Access-Control-Request-Method'] = 'GET';
axios.defaults.headers.common.Connection = 'keep-alive';
axios.defaults.headers.common.Origin = 'https://grauniad.netlify.app';
axios.defaults.headers.common.Referer = 'https://grauniad.netlify.app/index.html';
class App extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      isLoading: false,
      alert: null,
      article: { fields: {} },
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { setAlert } = this;

    const response = await axios
      .get(
        `/search?q=liverpool&page-size=20&&show-fields=thumbnail,trailText&section=football&api-key=${guardianApiKey}`,
        { crossdomain: true },
      )
      .catch((err) => setAlert(err, 'warning'));
    this.setState({ articles: response.data.response.results, isLoading: false });
  }

  searchArticles = async (text) => {
    this.setState({ isLoading: true });
    const { setAlert } = this;
    const response = await axios
      .get(
        `/search?q=liverpool ${text}&page-size=20&show-fields=thumbnail,trailText&section=football&api-key=${guardianApiKey}`,
        { crossdomain: true },
      )
      .catch((err) => setAlert(err, 'warning'));
    this.setState({ articles: response.data.response.results, isLoading: false });
  };

  getArticle = async (id) => {
    this.setState({ isLoading: true });
    const { setAlert } = this;
    const response = await axios
      .get(
        `/${id}?show-fields=headline,byline,body,wordcount,lastModified&api-key=${guardianApiKey}`,
        { crossdomain: true },
      )
      .catch((err) => setAlert(err, 'warning'));
    this.setState({ article: response.data.response.content, isLoading: false });
  };

  // clears articles on button click
  clearArticles = (e) => {
    e.preventDefault();
    this.setState({ articles: [] });
  };

  // creates alert based on user actions, with a 5s timeout
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  // clear alerts
  clearAlert = () => {
    this.setState({ alert: null });
  };

  render() {
    const { isLoading, articles, alert, article } = this.state;
    const { searchArticles, clearArticles, setAlert, clearAlert, getArticle } = this;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <>
                    <Search
                      searchArticles={searchArticles}
                      clearArticles={clearArticles}
                      showClear={articles.length > 0}
                      setAlert={setAlert}
                      clearAlert={clearAlert}
                    />
                    <Articles isLoading={isLoading} articles={articles} />
                  </>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/article/:id*"
                render={(props) => (
                  <Article
                    {...props}
                    getArticle={getArticle}
                    article={article}
                    isLoading={isLoading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
