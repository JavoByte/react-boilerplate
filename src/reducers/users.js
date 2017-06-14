import {
  USERS_LOAD,
  USERS_LOADED,
  API_ERROR,
} from '../constants';

function users(state = {}, action) {
  switch (action.type) {
    case USERS_LOAD :
      return {
        loading: true,
      };
    case USERS_LOADED :
      return {
        loading: false,
        all: action.users,
      };
    case API_ERROR :
      return {
        loading: false,
        all: [],
      };
    default :
      return state;
  }
}

export default users;
