import React from 'react';
import ConnectedRoute from './ConnectedRoute';
import UsersContainer from '../components/users/UsersContainer';
import UsersIndex from '../components/users/UsersIndex';

export default ({match}) => (
  <UsersContainer>
    <ConnectedRoute path={`${match.url}`} exact component={UsersIndex} />
  </UsersContainer>
);
