import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ alert }) => {
  const { msg, type } = alert;
  return (
    alert !== null && (
      <div className={`alert alert-${type}`}>
        <i className="fas fa-info-circle">
          <span> </span>
          <span className="roboto">{msg}</span>
        </i>
      </div>
    )
  );
};

Alert.propTypes = {
  alert: {
    msg: PropTypes.string,
    type: PropTypes.string,
  },
};

Alert.defaultProps = {
  alert: {
    msg: '',
    type: '',
  },
};

export default Alert;
