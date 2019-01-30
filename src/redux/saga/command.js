import { all, takeEvery, call, put } from 'redux-saga/effects';
import { command } from '../action';
import { getAllCommands } from './api';

function * getAll() {
  const commands = yield call(getAllCommands);
  yield put(command.getAll.complete.create({commands}));
}

export default function * userSagas() {
  yield all([
    takeEvery(command.getAll.emit.id, getAll),
  ]);
}
