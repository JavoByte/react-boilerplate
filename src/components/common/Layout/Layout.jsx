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
import { withRouter } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './Layout.css';
import AppErrorMessage from '../AppErrorMessage';
import Navbar from '../Navbar';
import Footer from '../Footer';

function mapStateToProps(state) {
  return {
    application: state.application,
  };
}

class Layout extends React.Component {
  static propTypes = {
    application: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>
        <Navbar />
        {
          this.props.application.error ?
            <AppErrorMessage message={this.props.application.error} />
          : null
        }
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Layout)));
