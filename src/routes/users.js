import React from 'react';
import ConnectedRoute from './ConnectedRoute';
import UsersContainer from '../components/users/UsersContainer';
import UsersIndex from '../components/users/UsersIndex';

// eslint-disable-next-line react/prop-types
export default ({ match }) => (
  <UsersContainer>
    <ConnectedRoute path={`${match.url}`} exact component={UsersIndex} />
  </UsersContainer>
);
