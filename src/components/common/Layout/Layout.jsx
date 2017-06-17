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
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { logout } from '../../../actions/session';
import s from './Layout.css';
import AppErrorMessage from '../AppErrorMessage';
import Navbar from '../Navbar';
import Footer from '../Footer';

function mapStateToProps(state) {
  return {
    application: state.application,
    session: state.session,
  };
}

class Layout extends React.Component {
  static propTypes = {
    application: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    session: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>
        <Helmet titleTemplate="%s | GreyTech Soluciones">
          <title>Inicio</title>
        </Helmet>
        <Navbar user={this.props.session.user} logout={() => this.props.dispatch(logout())} />
        {
          this.props.application.error ?
            <AppErrorMessage message={this.props.application.error} />
          : null
        }
        { React.cloneElement(this.props.children, { user: this.props.session.user })}
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Layout)));
