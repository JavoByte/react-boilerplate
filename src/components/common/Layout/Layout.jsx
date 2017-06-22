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
import { withRouter, Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { logout } from '../../../actions/session';
import { toggleSidemenu, clearApplicationMessage } from '../../../actions/application';
import s from './Layout.css';
import ApplicationMessage from '../ApplicationMessage';
import AppErrorMessage from '../AppErrorMessage';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Sidemenu from '../Sidemenu';

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

  constructor(props) {
    super(props);
    this.clearMessage = this.clearMessage.bind(this);
    this.toggleSidemenu = this.toggleSidemenu.bind(this);
  }

  clearMessage(messageId) {
    this.props.dispatch(clearApplicationMessage(messageId));
  }

  toggleSidemenu() {
    this.props.dispatch(toggleSidemenu());
  }

  render() {
    return (
      <div>
        <Helmet titleTemplate="%s | React boilerplate">
          <title>Inicio</title>
        </Helmet>
        <Sidemenu isOpen={this.props.application.sidemenuOpen} toggleSidemenu={this.toggleSidemenu}>
          <Link to="/">
            Home
          </Link>
          <Link to="/users">
            Users
          </Link>
        </Sidemenu>
        <Navbar
          toggleSidemenu={this.toggleSidemenu}
          user={this.props.session.user}
          logout={() => this.props.dispatch(logout())}
        />
        <div id="app-content">
          {
            this.props.application.error ?
              <AppErrorMessage message={this.props.application.error} />
            : null
          }
          {
            this.props.application.messages.map(message =>
              <ApplicationMessage
                key={message.identifier}
                message={message}
                clearMessage={() => this.clearMessage(message.identifier)}
              />)
          }
          { React.cloneElement(this.props.children, { user: this.props.session.user })}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Layout)));
