import { all, fork } from 'redux-saga/effects';

import command from './command';
import startup from './startup';

export default function* root() {
    yield all([
        fork(command),
        fork(startup),
    ]);
}
