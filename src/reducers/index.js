import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import application from './application';
import contact from './contact';
import registration from './registration';
import runtime from './runtime';
import session from './session';
import user from './user';
import users from './users';

export default combineReducers({
  application,
  contact,
  registration,
  runtime,
  router: routerReducer,
  session,
  user,
  users,
});
