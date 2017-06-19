import {
  CONTACT_SEND,
  CONTACT_ERROR,
  CONTACT_SUCCESS,
  CONTACT_CLEAR,
} from '../constants';

function contact(state = {
  posting: false,
  message: null,
  errors: {},
}, action) {
  switch (action.type) {
    case CONTACT_SEND:
      return {
        ...state,
        posting: true,
      };
    case CONTACT_SUCCESS:
      return {
        ...state,
        message: action.message,
        posting: false,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        errors: action.errors,
        posting: false,
      };
    case CONTACT_CLEAR:
      return {
        ...state,
        errors: {},
        message: null,
        posting: false,
      };
    default:
      return state;
  }
}

export default contact;
