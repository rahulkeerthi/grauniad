import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const ArticleItem = ({
  article: {
    webTitle,
    id,
    fields: { thumbnail, trailText },
  },
}) => {
  const config = {
    FORBID_TAGS: ['aside', 'span', 'figcaption', 'figure', 'abbr'],
    IN_PLACE: true,
    KEEP_CONTENT: false,
  };

  const clean = DOMPurify.sanitize(`${trailText}`, config);

  return (
    <div className="card text-center">
      <img src={thumbnail} alt="" className="img" style={{ width: '240px' }} />
      <h3 className="">{webTitle}</h3>
      <p>{parse(clean)}</p>
      <Link to={`article/${id}`} className="btn btn-dark btn-sm my-1">
        Read More
      </Link>
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
    id: PropTypes.string,
  }).isRequired,
};

export default ArticleItem;
