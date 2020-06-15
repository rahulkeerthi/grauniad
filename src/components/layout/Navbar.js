/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Navbar extends Component {
  render() {
    const { icon, title } = this.props;
    return (
      <nav className="navbar bg-primary">
        <h1>
          <i className={icon} />
          <span> </span>
          {title}
        </h1>
      </nav>
    );
  }
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

// Navbar.defaultProps = {
//   title: 'Grauniad Reader',
//   icon: 'far fa-newspaper',
// };
export default Navbar;
