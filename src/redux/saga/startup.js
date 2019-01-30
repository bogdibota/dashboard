import { put } from 'redux-saga/effects';
import { command } from '../action';

export default function* startup() {
    yield put(command.getAll.emit.create());
}
