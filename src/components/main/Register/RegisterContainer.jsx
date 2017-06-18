import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as registrationActions from '../../../actions/registration';
import RegisterForm from './RegisterForm';

const mapStateToProps = state => ({
  registration: state.registration,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(registrationActions, dispatch);

class RegisterContainer extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Registro</title>
        </Helmet>
        <RegisterForm {...this.props} />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterContainer));
