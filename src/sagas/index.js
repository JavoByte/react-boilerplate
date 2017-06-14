import { END } from 'redux-saga';
import { take, fork } from 'redux-saga/effects';
import users from './users';

const allSagas = [
  users,
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
