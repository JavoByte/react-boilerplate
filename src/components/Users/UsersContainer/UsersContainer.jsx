import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from '../../../actions/users';

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(usersActions, dispatch);
}

class UsersContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return React.cloneElement(this.props.children, this.props);
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersContainer));
