import { LOCATION_CHANGE } from 'react-router-redux';
import {
  API_ERROR,
  APPLICATION_SERVER_REDIRECT,
} from '../constants';
import config from '../config';

function application(state = {}, action) {
  switch (action.type) {
    case APPLICATION_SERVER_REDIRECT:
      return {
        ...state,
        serverRedirect: {
          from: action.from,
          pathChanged: false, // this flag is used to allow 1 route change (the default one)
          // if the route changes more than once, this serverRedirect should be cleared.
        },
      };
    case LOCATION_CHANGE:
      if (state.serverRedirect) {
        if (state.serverRedirect.pathChanged) {
          // The default LOCATION_CHANGE already done. Clear server redirect
          const { serverRedirect, ...newState } = state;
          return newState;
        }
        // Mark the state with LOCATION_CHANGE done
        return {
          ...state,
          serverRedirect: {
            ...state.serverRedirect,
            pathChanged: true,
          },
        };
      }
      return state;
    case API_ERROR:
      return {
        error: config.api.defaultErrorMessage,
      };
    default:
      return state;
  }
}

export default application;
