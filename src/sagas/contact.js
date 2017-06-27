import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  API_PATHS,
  API_ERROR,
  API_ERROR_MESSAGE,
  APPLICATION_SEND_MESSAGE,
  CONTACT_SEND,
  CONTACT_SUCCESS,
  CONTACT_ERROR,
  MESSAGE_TYPE_ERROR,
} from '../constants';

function* sendContactForm(action) {
  const { data } = action;
  try {
    const response = yield call(() =>
      axios.post(API_PATHS.contact, data));
    yield put({
      type: CONTACT_SUCCESS,
      message: response.data.message,
    });
  } catch (error) {
    let actionToPut;
    if (error.response.status === 422 && error.response.data) {
      actionToPut = {
        type: CONTACT_ERROR,
        errors: error.response.data,
      };
    } else {
      actionToPut = {
        type: APPLICATION_SEND_MESSAGE,
        message: {
          identifier: API_ERROR,
          message: API_ERROR_MESSAGE,
          type: MESSAGE_TYPE_ERROR,
        },
      };
    }
    yield put(actionToPut);
  }
}

function getSaga(action) {
  switch (action.type) {
    case CONTACT_SEND:
      return sendContactForm;
    default:
      return null;
  }
}

export default getSaga;
