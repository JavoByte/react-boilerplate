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
import s from './Home.css';
import Button from '../../common/Button';

class Home extends React.Component {

  render() {
    return (
      <div className={s.root}>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Welcome page" />
        </Helmet>

        <h1>
          Application home page
        </h1>

        <p>
          This is a react boilerplate. Feel free to edit this project to fit your needs.
        </p>
        <p>
          Read the docs to learn how this project is built and technologies included
        </p>
        <h2>
          Included components
        </h2>
        <h4>
          Buttons
        </h4>
        <div className="text-center">
          <Button color="primary">
            Primary
          </Button>
          <Button color="success">
            Success
          </Button>
          <Button color="warning">
            Warning
          </Button>
          <Button color="danger">
            Danger
          </Button>
          <Button color="info">
            Info
          </Button>
        </div>
        <hr />
        <div className="text-center">
          <Button color="primary" outline>
            Primary
          </Button>
          <Button color="success" outline>
            Success
          </Button>
          <Button color="warning" outline>
            Warning
          </Button>
          <Button color="danger" outline>
            Danger
          </Button>
          <Button color="info" outline>
            Info
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
