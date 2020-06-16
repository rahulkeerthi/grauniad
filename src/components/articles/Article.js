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
        webPublicationDate,
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
    const readingMinutes = Math.round(Number(wordcount) / 200);
    const date = new Date(webPublicationDate);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const showDate = date.toLocaleDateString('en-US', options);

    return (
      <div>
        <h2>
          {pillarName} / {sectionName}
        </h2>
        <h1>{headline}</h1>
        <h4>{showDate}</h4>
        <h3>
          <span>{byline} </span>
        </h3>
        <span>{readingMinutes} min reading time</span>
        <hr className="my-1" />
        <div className="article-content">{parse(clean)}</div>
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
