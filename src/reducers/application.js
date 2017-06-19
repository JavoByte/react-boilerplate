import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'lodash';
import {
  API_ERROR,
  APPLICATION_SEND_MESSAGE,
  APPLICATION_CLEAR_MESSAGE,
  APPLICATION_SERVER_REDIRECT,
} from '../constants';
import config from '../config';

function randomString(length, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function application(state = {
  messages: [],
}, action) {
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
    case APPLICATION_SEND_MESSAGE:
      return {
        ...state,
        messages: (() => {
          if (action.message.identifier) {
            const messagesWithout = _.filter(
              state.messages,
              item => item.identifier !== action.message.identifier);
            return [
              ...messagesWithout,
              action.message,
            ];
          }
          return [
            ...state.messages,
            {
              identifier: randomString(6),
              ...action.message,
            },
          ];
        })(),
      };
    case APPLICATION_CLEAR_MESSAGE:
      return {
        ...state,
        messages: _.filter(state.messages, item => item.identifier !== action.identifier),
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
