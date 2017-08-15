import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  API_PATHS,
  API_ERROR,
  API_ERROR_MESSAGE,
  MESSAGE_TYPE_ERROR,
  APPLICATION_SEND_MESSAGE,
  USERS_LOAD,
  USERS_LOADED,
} from '../constants';


function* getUsers() {
  try {
    const response = yield call(() => axios.get(API_PATHS.users));
    yield put({
      type: USERS_LOADED,
      users: response.data,
    });
  } catch (error) {
    yield put({
      type: APPLICATION_SEND_MESSAGE,
      message: {
        identifier: API_ERROR,
        message: API_ERROR_MESSAGE,
        type: MESSAGE_TYPE_ERROR,
      },
    });
  }
}

function getSaga(action) {
  switch (action.type) {
    case USERS_LOAD:
      return getUsers;
    default :
      return null;
  }
}

export default getSaga;
