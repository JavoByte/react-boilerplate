import {
  SESSION_LOGGED_IN,
  SESSION_LOGGED_OUT,
  SESSION_ATTEMPT_ERROR,
  REGISTRATION_SUCCESS,
} from '../constants';

function session(state = {
  user: null,
  errors: {},
}, action) {
  switch (action.type) {
    case SESSION_ATTEMPT_ERROR:
      return {
        user: null,
        errors: action.errors,
      };
    case SESSION_LOGGED_IN:
      return {
        errors: {},
        user: action.user,
      };
    case SESSION_LOGGED_OUT:
      return {
        ...state,
        user: null,
      };
    case REGISTRATION_SUCCESS:
      return {
        user: action.user,
      };
    default:
      return state;
  }
}

export default session;
