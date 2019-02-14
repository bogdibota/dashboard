import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { command } from '../action';
import { createCommand, getAllCommands } from './api';

function* getAll() {
  const commands = yield call(getAllCommands);
  yield put(command.getAll.complete.create({commands}));
}

function* create({isFolder, name}) {
  const selectedCommand = (yield select(({command: {selectedCommand}}) => selectedCommand)) || {id: 'ROOT'};
  const result = yield call(createCommand, {isFolder, name, parent: selectedCommand.id});
  if (result.error) {
    yield put(command.create.error.create({errorMessage: 'Error while adding command.'}));
  } else {
    yield put(command.create.complete.create());
  }
}

export default function* userSagas() {
  yield all([
    takeEvery(command.getAll.emit.id, getAll),
    takeEvery(command.create.complete.id, getAll),
    takeEvery(command.create.emit.id, create),
  ]);
}
