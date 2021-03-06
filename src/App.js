/* eslint-disable max-len */
// /* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Articles from './components/articles/Articles';
import Article from './components/articles/Article';
import Search from './components/articles/Search';
import Alert from './components/layout/Alert';
import './App.css';

const axios = require('axios').default;

let guardianApiKey;

if (process.env.NODE_ENV !== 'production') {
  guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
} else {
  guardianApiKey = process.env.GUARDIAN_API_KEY;
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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
        `https://content.guardianapis.com/search?q=liverpool&page-size=20&show-fields=thumbnail,trailText&section=football&api-key=${guardianApiKey}`,
      )
      .catch((err) => setAlert(err.message, 'light'));
    this.setState({ articles: response.data.response.results, isLoading: false });
  }

  searchArticles = async (text) => {
    this.setState({ isLoading: true });
    const { setAlert } = this;
    const response = await axios
      .get(
        `https://content.guardianapis.com/search?q=${text}&page-size=20&show-fields=thumbnail,trailText&section=football&api-key=${guardianApiKey}`,
      )
      .catch((err) => setAlert(err.message, 'light'));
    this.setState({ articles: response.data.response.results, isLoading: false });
  };

  getArticle = async (id) => {
    this.setState({ isLoading: true });
    const { setAlert } = this;
    const response = await axios
      .get(
        `https://content.guardianapis.com/${id}?show-fields=headline,byline,body,wordcount,lastModified&api-key=${guardianApiKey}`,
      )
      .catch((err) => setAlert(err.message, 'light'));
    this.setState({ article: response.data.response.content, isLoading: false });
  };

  // clears articles on button click
  clearArticles = (e) => {
    e.preventDefault();
    this.setState({ articles: [] });
  };

  // creates alert based on user actions, with a 5s timeout
  setAlert = (msg, type) => {
    const alert = { msg, type };
    this.setState({ alert });
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
            {alert !== null ? <Alert alert={alert} /> : ''}
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
