import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  onSubmit = (e) => {
    const { text } = this.state;
    const { searchArticles, setAlert } = this.props;
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter a search query', 'light');
    } else {
      searchArticles(text);
    }
  };

  onChange = (e) => {
    const { clearAlert } = this.props;
    // [e.target.name] allows dynamic assignment of state keys based on form name
    this.setState({ [e.target.name]: e.target.value });
    clearAlert();
  };

  render() {
    const { text } = this.state;
    const { clearArticles, showClear } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Articles..."
            value={text}
            onChange={this.onChange}
          />
          <input type="submit" value="Search" className="btn btn-dark btn-block" />
        </form>
        {showClear && (
          <button type="submit" className="btn btn-light btn-block" onClick={clearArticles}>
            Clear
          </button>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  searchArticles: PropTypes.func.isRequired,
  clearArticles: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
  clearAlert: PropTypes.func.isRequired,
};

export default Search;
