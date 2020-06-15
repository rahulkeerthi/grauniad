import React from 'react';
import PropTypes from 'prop-types';

const ArticleItem = ({ article: { imageUrl, title, linkUrl, bodyPreview } }) => {
  return (
    <div className="card text-center">
      <img src={imageUrl} alt="" className="img" style={{ width: '240px' }} />
      <h3 className="">{title}</h3>
      <p>{bodyPreview}</p>
      <a href={linkUrl} className="btn btn-dark btn-sm my-1">
        Read More
      </a>
    </div>
  );
};

ArticleItem.propTypes = {
  article: PropTypes.shape({
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    linkUrl: PropTypes.string,
    bodyPreview: PropTypes.string,
  }).isRequired,
};

export default ArticleItem;
