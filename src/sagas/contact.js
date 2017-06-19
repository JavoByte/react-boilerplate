import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  API_PATHS,
  API_ERROR,
  CONTACT_SEND,
  CONTACT_SUCCESS,
  CONTACT_ERROR,
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
    if (error.response.data) {
      yield put({
        type: CONTACT_ERROR,
        errors: error.response.data,
      });
    } else {
      yield put({
        type: API_ERROR,
        error,
      });
    }
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
