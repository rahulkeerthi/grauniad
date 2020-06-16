import React from 'react';
import PropTypes from 'prop-types';

const ArticleItem = ({
  article: {
    webTitle,
    linkUrl,
    fields: { thumbnail, trailText },
  },
}) => {
  return (
    <div className="card text-center">
      <img src={thumbnail} alt="" className="img" style={{ width: '240px' }} />
      <h3 className="">{webTitle}</h3>
      <p>{trailText}</p>
      <a href={linkUrl} className="btn btn-dark btn-sm my-1">
        Read More
      </a>
    </div>
  );
};

ArticleItem.propTypes = {
  article: PropTypes.shape({
    fields: PropTypes.shape({
      thumbnail: PropTypes.string,
      trailText: PropTypes.string,
    }),
    webTitle: PropTypes.string,
    linkUrl: PropTypes.string,
  }).isRequired,
};

export default ArticleItem;
