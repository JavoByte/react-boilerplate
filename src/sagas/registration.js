import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  API_PATHS,
  API_ERROR,
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
    if (error.response) {
      yield put({
        type: REGISTRATION_ERROR,
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
    case REGISTRATION_ATTEMPT:
      return register;
    default :
      return null;
  }
}

export default getSaga;
