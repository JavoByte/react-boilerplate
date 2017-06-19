import { END } from 'redux-saga';
import { take, fork } from 'redux-saga/effects';
import contact from './contact';
import users from './users';
import registration from './registration';
import session from './session';

const allSagas = [
  contact,
  users,
  registration,
  session,
];

function getTasks(action) {
  const tasks = [];
  for (let i = 0; i < allSagas.length; i++) {
    const task = allSagas[i](action);
    if (task !== null && task !== undefined) {
      tasks.push(task);
    }
  }
  return tasks;
}

function* universalSaga() {
  let action;
  do {
    action = yield take('*');
    const tasks = getTasks(action);
    if (tasks.length > 0) {
      for (let i = 0; i < tasks.length; i++) {
        yield fork(tasks[i], action);
      }
    }
  } while (action !== END);
}

function* rootSaga() {
  yield fork(universalSaga);
}


export default function startSagas(sagaMiddleware) {
  return sagaMiddleware.run(rootSaga);
}
