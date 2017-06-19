/* eslint-disable import/prefer-default-export */

import {
  APPLICATION_SEND_MESSAGE,
  APPLICATION_CLEAR_MESSAGE,
  APPLICATION_SERVER_REDIRECT,
} from '../constants';

export function setServerRedirect(from) {
  return {
    type: APPLICATION_SERVER_REDIRECT,
    from,
  };
}

export function sendApplicationMessage(message, type = 'info', identifier = null) {
  return {
    type: APPLICATION_SEND_MESSAGE,
    message: {
      message,
      type,
      identifier,
    },
  };
}

export function clearApplicationMessage(identifier) {
  return {
    type: APPLICATION_CLEAR_MESSAGE,
    identifier,
  };
}
