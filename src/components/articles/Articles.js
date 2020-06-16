/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import ArticleItem from './ArticleItem';
import Spinner from '../layout/Spinner';

const articleStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

const Articles = ({ isLoading, articles }) => {
  if (isLoading) {
    return (
      <div className="container text-center x-large py-3">
        <Spinner />
      </div>
    );
  }
  return (
    <div style={articleStyle}>
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  );
};

Articles.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Articles;
