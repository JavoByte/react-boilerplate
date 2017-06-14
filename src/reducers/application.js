import { API_ERROR } from '../constants';
import config from '../config';

function application(state = {}, action) {
  switch (action.type) {
    case API_ERROR:
      return {
        error: config.api.defaultErrorMessage,
      };
    default:
      return state;
  }
}

export default application;
