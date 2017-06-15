import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import application from './application';
import user from './user';
import users from './users';
import runtime from './runtime';
import session from './session';

export default combineReducers({
  application,
  user,
  users,
  runtime,
  router: routerReducer,
  session,
});
