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

// axios.defaults.headers.common = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Methods': 'GET',
//   'Access-Control-Request-Headers': 'Content-Type, application/x-www-form-urlencoded',
// };
let guardianApiKey;

if (process.env.NODE_ENV !== 'production') {
  guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
} else {
  guardianApiKey = process.env.GUARDIAN_API_KEY;
}
const instance = axios.create();
instance.defaults.headers.common = {};
instance.defaults.headers.common.accept = 'application/json';
instance.defaults.headers.common['api-key'] = guardianApiKey;
instance.defaults.headers.common.cookie =
  'AWSELB=75B9BD811C5C032EDEF76366759629DCCB8726D7A30D93925AE6796CF81003C5E07EB78986E4519DDF3CD336789F71716B110728D8DE1BEBEA2066D91EF4E557583DFDBA28; AWSELBCORS=75B9BD811C5C032EDEF76366759629DCCB8726D7A30D93925AE6796CF81003C5E07EB78986E4519DDF3CD336789F71716B110728D8DE1BEBEA2066D91EF4E557583DFDBA28';

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

    const response = await instance
      .get(
        `https://content.guardianapis.com/search?q=liverpool&page-size=20&&show-fields=thumbnail,trailText&section=football`,
        { crossdomain: true },
      )
      .catch((err) => setAlert(err, 'warning'));
    this.setState({ articles: response.data.response.results, isLoading: false });
  }

  searchArticles = async (text) => {
    this.setState({ isLoading: true });
    const { setAlert } = this;
    const response = await instance
      .get(
        `https://content.guardianapis.com/search?q=liverpool ${text}&page-size=20&show-fields=thumbnail,trailText&section=football`,
        { crossdomain: true },
      )
      .catch((err) => setAlert(err, 'warning'));
    this.setState({ articles: response.data.response.results, isLoading: false });
  };

  getArticle = async (id) => {
    this.setState({ isLoading: true });
    const { setAlert } = this;
    const response = await instance
      .get(
        `https://content.guardianapis.com/${id}?show-fields=headline,byline,body,wordcount,lastModified`,
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
                render={(props) => (
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
