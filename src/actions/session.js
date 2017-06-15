/* eslint-disable import/prefer-default-export */

import {
  SESSION_ATTEMPT,
  SESSION_LOGGED_IN,
  SESSION_LOGGED_OUT,
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

export function loggedOut() {
  return {
    type: SESSION_LOGGED_OUT,
  };
}
