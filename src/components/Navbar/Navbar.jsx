/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navbar.css';

class Navbar extends React.Component {
  render() {
    return (
      <div className={s.root} role="navigation">
        <div className={s.container}>
          <ul className={cx(s.nav, s.navbarRight)}>
            <li>
              <Link to="/contact">No funciona</Link>
            </li>
            <li>
              <Link to="/about">Acerca de</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Navbar);
