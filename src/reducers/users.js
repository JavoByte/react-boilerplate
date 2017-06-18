import {
  USERS_LOAD,
  USERS_LOADED,
  API_ERROR,
  REGISTRATION_SUCCESS,
} from '../constants';
import User from '../models/User';

function users(state = {
  loaded_at: 0,
  loading: false,
  all: [],
}, action) {
  switch (action.type) {
    case USERS_LOAD :
      return {
        ...state,
        loading: true,
      };
    case USERS_LOADED :
      return {
        loaded_at: +new Date(),
        loading: false,
        all: action.users.map(user => new User(user)),
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        loaded_at: 0, // force reload on next /users visit
      };
    case API_ERROR :
      return {
        ...state,
        loading: false,
      };
    default :
      return state;
  }
}

export default users;
