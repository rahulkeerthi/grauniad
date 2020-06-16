import React, { Component } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import Spinner from '../layout/Spinner';

class Article extends Component {
  componentDidMount() {
    const { getArticle, match } = this.props;
    getArticle(match.params.id);
  }

  render() {
    const {
      isLoading,
      article: {
        sectionName,
        pillarName,
        fields: { body, byline, headline, wordcount },
      },
    } = this.props;

    if (isLoading) {
      return (
        <div className="container text-center x-large py-3">
          <Spinner />
        </div>
      );
    }

    // sanitise HTML in body using DOMPurify
    const config = {
      FORBID_TAGS: ['aside', 'span', 'figcaption', 'figure', 'abbr'],
      IN_PLACE: true,
      KEEP_CONTENT: false,
    };

    const clean = DOMPurify.sanitize(`${body}`, config);

    return (
      <div>
        <h1>
          {pillarName} / {sectionName}
        </h1>
        <h2>{headline}</h2>
        <h3>
          {byline}
          <span> - </span>
          <span>{wordcount} words</span>
        </h3>
        <div>{parse(clean)}</div>
      </div>
    );
  }
}

Article.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  getArticle: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
  article: PropTypes.shape({
    sectionName: PropTypes.string,
    pillarName: PropTypes.string,
    fields: PropTypes.shape({
      body: PropTypes.string,
      byline: PropTypes.string,
      headline: PropTypes.string,
      wordcount: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Article;
