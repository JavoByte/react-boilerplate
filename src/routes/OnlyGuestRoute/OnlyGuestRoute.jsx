import React from 'react';
import PrivateRoute from '../PrivateRoute';

function OnlyGuestRoute(props) {
  return (
    <PrivateRoute {...props} validator={user => !user} />
  );
}

export default OnlyGuestRoute;
