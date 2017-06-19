import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  API_PATHS,
  API_ERROR,
  SESSION_ATTEMPT,
  SESSION_ATTEMPT_ERROR,
  SESSION_LOGGED_IN,
  SESSION_LOGOUT,
  SESSION_LOGGED_OUT,
} from '../constants';

function* attemptLogin(action) {
  try {
    const response = yield call(() =>
      axios.post(API_PATHS.login, action.credentials));
    yield put({
      type: SESSION_LOGGED_IN,
      token: response.data.token,
      user: response.data.user,
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

function* logout() {
  try {
    yield call(() =>
      axios.post(API_PATHS.logout));
    yield put({
      type: SESSION_LOGGED_OUT,
    });
  } catch (error) {
    yield put({
      type: API_ERROR,
      error,
    });
  }
}

function getSaga(action) {
  switch (action.type) {
    case SESSION_ATTEMPT:
      return attemptLogin;
    case SESSION_LOGOUT:
      return logout;
    default :
      return null;
  }
}

export default getSaga;
