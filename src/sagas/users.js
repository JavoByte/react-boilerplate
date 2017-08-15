import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  ACTION_API_ERROR,
  API_PATHS,
  USERS_LOAD,
  USERS_LOADED,
  USERS_LOAD_ERROR,
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
      type: ACTION_API_ERROR,
      handledType: USERS_LOAD_ERROR,
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
