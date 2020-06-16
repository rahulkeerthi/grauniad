import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle">
          <span className="roboto"> {alert.msg}</span>
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
