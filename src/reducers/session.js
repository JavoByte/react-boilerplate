import {
  SESSION_ATTEMPT_ERROR,
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
    default:
      return state;
  }
}

export default session;
