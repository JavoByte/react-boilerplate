import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { attemptLogin } from '../../../actions/session';
import LoginForm from './LoginForm';

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ attemptLogin }, dispatch);
}

class Login extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Log in</title>
        </Helmet>
        <LoginForm {...this.props} />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
