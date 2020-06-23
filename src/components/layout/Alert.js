import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ msg, type }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${type}`}>
        <i className="fas fa-info-circle">
          <span className="roboto"> {msg}</span>
        </i>
      </div>
    )
  );
};

Alert.propTypes = {
  alert: PropTypes.shape({ msg: PropTypes.string, type: PropTypes.string }),
};

Alert.defaultProps = { alert: null };

export default Alert;
