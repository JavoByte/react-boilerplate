/* eslint-disable import/prefer-default-export */

import {
  REGISTRATION_ATTEMPT,
} from '../constants';

export function register(user) {
  return {
    type: REGISTRATION_ATTEMPT,
    user,
  };
}
