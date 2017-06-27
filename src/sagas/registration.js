import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  API_PATHS,
  API_ERROR,
  API_ERROR_MESSAGE,
  APPLICATION_SEND_MESSAGE,
  MESSAGE_TYPE_ERROR,
  REGISTRATION_ATTEMPT,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
} from '../constants';

function* register(action) {
  const { user } = action;
  try {
    const response = yield call(() =>
      axios.post(API_PATHS.register, user));
    yield put({
      type: REGISTRATION_SUCCESS,
      user: response.data.user,
      token: response.data.token,
    });
  } catch (error) {
    let actionToPut;
    if (error.response && error.response.status === 422) {
      actionToPut = {
        type: REGISTRATION_ERROR,
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
    case REGISTRATION_ATTEMPT:
      return register;
    default :
      return null;
  }
}

export default getSaga;
