import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const { icon, title } = props;
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon} />
        <span> </span>
        {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Grauniad Reader',
  icon: 'far fa-newspaper',
};
export default Navbar;
