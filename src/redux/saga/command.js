import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { command } from '../action';
import { createCommand, getAllCommands, runCommand, updateCommand, deleteCommand } from './api';

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

function* update({label, action, id}) {
  const selectedCommand = (yield select(({command: {selectedCommand}}) => selectedCommand)) || {id: 'ROOT'};
  const result = yield call(updateCommand, {label, action, id});
  if (result.error) {
    yield put(command.update.error.create({errorMessage: 'Error while updating command.'}));
  } else {
    yield put(command.update.complete.create());

    const idFragments = id.split('*');
    const newSelectedCommand = {
      ...selectedCommand,
      label,
      action,
      id: [ ...idFragments.slice(0, idFragments.length - 2), label ].join('*'),
    };

    yield put(command.select.emit.create({selectedCommand: newSelectedCommand}));
  }
}

function* run({id}) {
  const result = yield call(runCommand, {id});
  if (result.error) {
    yield put(command.run.error.create({errorMessage: `Error while running command: ${ result.error }`}));
  } else {
    yield put(command.run.complete.create());
  }
}

function* remove({id}) {
  const parent = yield call(deleteCommand, {id});

  if (parent.error) {
    yield put(command.delete.error.create({errorMessage: `Error while deleting command: ${ parent.error }`}));
  } else {
    yield put(command.delete.complete.create());
  }
  if(parent.id && parent.id === 'ROOT'){
    yield put(command.select.emit.create({selectedCommand: null}));
  } else {
    yield put(command.select.emit.create({selectedCommand: parent}));
  }
}

export default function* userSagas() {
  yield all([
    takeEvery(command.getAll.emit.id, getAll),

    takeEvery(command.create.complete.id, getAll),
    takeEvery(command.create.emit.id, create),

    takeEvery(command.update.emit.id, update),
    takeEvery(command.update.complete.id, getAll),

    takeEvery(command.run.emit.id, run),

    takeEvery(command.delete.emit.id, remove),
    takeEvery(command.delete.complete.id, getAll),
  ]);
}
