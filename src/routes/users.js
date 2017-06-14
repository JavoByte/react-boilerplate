import React from 'react';
import ConnectedRoute from './ConnectedRoute';
import UsersContainer from '../components/Users/UsersContainer';
import UsersIndex from '../components/Users/UsersIndex';

export default () => (
  <UsersContainer>
    <ConnectedRoute path="/users" exact component={UsersIndex} />
  </UsersContainer>
);
