import React from 'react';
import PrivateRoute from '../PrivateRoute';

function AuthRoute(props) {
  return (
    <PrivateRoute {...props} validator={user => user} />
  );
}

export default AuthRoute;
