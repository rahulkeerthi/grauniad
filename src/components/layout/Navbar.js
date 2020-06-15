import React, { Component } from 'react';

export class Navbar extends Component {
  static defaultProps = {
    title: 'Grauniad Reader',
    icon: 'far fa-newspaper',
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  };

  render() {
    return (
      <nav className="navbar bg-primary">
        <h1>
          <i className={this.props.icon} />
          {this.props.title}
        </h1>
      </nav>
    );
  }
}

export default Navbar;
