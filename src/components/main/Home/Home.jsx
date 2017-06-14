/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Helmet from 'react-helmet';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Map from '../../common/Map';
import s from './Home.css';

class Home extends React.Component {

  render() {
    return (
      <div className={s.root}>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Welcome page" />
        </Helmet>

        <div className={s.container}>
          <h1>React.js Newsss</h1>
          <Map />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
