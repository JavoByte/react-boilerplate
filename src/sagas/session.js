import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  API_ERROR,
  SESSION_ATTEMPT,
  SESSION_ATTEMPT_ERROR,
  SESSION_LOGGED_IN,
} from '../constants';
import config from '../config';

function* attemptLogin(action) {
  try {
    const response = yield call(() =>
      axios.post(`${config.api.url}/login`, action.credentials));
    yield put({
      type: SESSION_LOGGED_IN,
      users: response.data,
    });
  } catch (error) {
    if (error.response && error.response.data) {
      const { response } = error;
      yield put({
        type: SESSION_ATTEMPT_ERROR,
        errors: response.data,
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
    case SESSION_ATTEMPT:
      return attemptLogin;
    default :
      return null;
  }
}

export default getSaga;
