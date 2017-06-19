/* eslint-disable import/prefer-default-export */

import {
  USERS_LOAD,
} from '../constants';

export function getUsers() {
  return {
    type: USERS_LOAD,
  };
}
