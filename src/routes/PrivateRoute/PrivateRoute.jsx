import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { sendApplicationMessage } from '../../actions/application';

const basicProps = {
  component: PropTypes.any.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  validator: PropTypes.func.isRequired,
};

class ComponentRender extends React.Component {

  static propTypes = {
    ...basicProps,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    serverRedirect: PropTypes.shape({
      from: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string,
        hash: PropTypes.string,
        message: PropTypes.string,
        messageType: PropTypes.string,
      }),
    }),
    redirectTo: PropTypes.string,
  };

  static defaultProps = {
    user: null,
    serverRedirect: null,
    redirectTo: '/',
  };

  componentWillMount() {
    const { from } = (this.props.location.state || {});
    if (from) {
      const { message, messageType } = from;
      if (message) {
        this.props.sendApplicationMessage(message, messageType);
      }
    }
  }

  render() {
    const {
      component: Component,
      user,
      validator,
      ...otherProps
    } = this.props;

    if (!user && !validator(null)) {
      // There's not a logged in user and route requires a logged user.
      // Redirect to "/login"
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              from: {
                ...otherProps.location,
                message: 'please, log in',
              },
            },
          }}
        />
      );
    }
    if (validator(user)) {
      return <Component {...otherProps} user={user} />;
    }
    // There is in fact a logged user but validator rejected him.
    // This might be because this is a Guest only route.
    // We must redirect him. Let's check if someone redirected us here in the first place
    // if that's the case, we will redirect back there
    // if not, redirect to "redirectTo" property (/ is default)

    const { from } = (otherProps.location.state || {});

    // There's an special case. The redirect could be done from the server
    // so our referrer is not in the default history object. Fortunately, we saved it
    // in our redux state and connected to that specific property

    const { serverRedirect } = otherProps;
    let redirectTo;
    if (from) {
      redirectTo = from.pathname;
    } else if (serverRedirect && serverRedirect.from) {
      console.log('redirecting to server referrer');
      redirectTo = serverRedirect.from.pathname;
    } else {
      redirectTo = otherProps.redirectTo;
    }
    return (
      <Redirect
        to={{
          pathname: redirectTo,
          state: { from: otherProps.location },
        }}
      />
    );
  }
}


const ConnectedComponentRender = withRouter(
  connect(
    state => (
      {
        serverRedirect: state.application.serverRedirect,
      }
    ),
    dispatch => bindActionCreators({
      sendApplicationMessage,
    }, dispatch))(ComponentRender));

function PrivateRoute(props) {
  const {
    component,
    user,
    validator,
    ...otherProps
  } = props;

  return (
    <Route
      {...otherProps}
      render={routeProps => <ConnectedComponentRender {...props} {...routeProps} />}
    />
  );
}

PrivateRoute.propTypes = {
  ...basicProps,
};
PrivateRoute.defaultProps = {
  user: null,
};

export default PrivateRoute;
