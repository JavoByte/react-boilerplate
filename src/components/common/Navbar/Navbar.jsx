/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navbar.css';

const reactLogo = 'https://upload.wikimedia.org/wikipedia/en/a/a7/React-icon.svg';

class Navbar extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
    logout: PropTypes.func.isRequired,
    toggleSidemenu: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
  }

  render() {
    const { user } = this.props;
    return (
      <nav className={s.root} role="navigation">
        <div className={s.container}>
          <ul className={s.nav}>
            <li>
              <button onClick={this.props.toggleSidemenu} className={s.menuToggler}>
                Menu
              </button>
            </li>
          </ul>
          <Link to="/" className={s.navbarBrand}>
            <img src={reactLogo} alt="React boilerplate" />
            React boilerplate
          </Link>
          <ul className={cx(s.nav, s.navbarRight)}>
            <li>
              <Link to="/users">Users</Link>
            </li>
            {
              user ?
                null
              : (
                <li>
                  <Link to="/register">Register</Link>
                </li>
              )
            }
            <li>
              {
                user ?
                  <button onClick={this.props.logout}>Logout</button>
                :
                  <Link to="/login">Login</Link>
              }
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withStyles(s)(Navbar);
