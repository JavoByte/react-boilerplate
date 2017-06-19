import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  API_PATHS,
  API_ERROR,
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
      type: API_ERROR,
      error,
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
