/* eslint-disable import/prefer-default-export */
import {
  CONTACT_SEND,
  CONTACT_CLEAR,
} from '../constants';

export function sendContactForm(data) {
  return {
    type: CONTACT_SEND,
    data,
  };
}

export function clearContactData() {
  return {
    type: CONTACT_CLEAR,
  };
}
