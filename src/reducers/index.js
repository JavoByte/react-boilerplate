import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import application from './application';
import registration from './registration';
import runtime from './runtime';
import session from './session';
import user from './user';
import users from './users';

export default combineReducers({
  application,
  registration,
  runtime,
  router: routerReducer,
  session,
  user,
  users,
});
