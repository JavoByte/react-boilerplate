/* eslint-disable import/prefer-default-export */

import {
  APPLICATION_SEND_MESSAGE,
  APPLICATION_SERVER_REDIRECT,
} from '../constants';

export function setServerRedirect(from) {
  return {
    type: APPLICATION_SERVER_REDIRECT,
    from,
  };
}

export function sendApplicationMessage(message, type = 'info') {
  return {
    type: APPLICATION_SEND_MESSAGE,
    message: {
      message,
      type,
    },
  };
}
