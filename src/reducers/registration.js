import {
  REGISTRATION_ATTEMPT,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
} from '../constants';

function registration(state = {
  posting: false,
  errors: {},
}, action) {
  switch (action.type) {
    case REGISTRATION_ATTEMPT:
      return {
        posting: true,
        errors: {},
      };
    case REGISTRATION_SUCCESS:
      return {
        posting: false,
        errors: {},
      };
    case REGISTRATION_ERROR:
      return {
        posting: false,
        errors: action.errors,
      };
    default:
      return state;
  }
}

export default registration;
