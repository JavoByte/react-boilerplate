/* eslint-disable import/prefer-default-export */

import {
  SESSION_ATTEMPT,
  SESSION_LOGGED_IN,
  SESSION_LOGOUT,
} from '../constants';

export function attemptLogin(credentials) {
  return {
    type: SESSION_ATTEMPT,
    credentials,
  };
}

export function loggedIn(user) {
  return {
    type: SESSION_LOGGED_IN,
    user,
  };
}

export function logout() {
  return {
    type: SESSION_LOGOUT,
  };
}
