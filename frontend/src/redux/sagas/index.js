import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import authSaga from './authSaga';
import PlaceSaga from './placeSaga';
import inquerySaga from './inquerySaga';
import commentSaga from './commentSaga';
import reservationSaga from './reservationSaga';
import officeSaga from './officeSaga';
import rentalSaga from './rentalSaga';
import scheduleSaga from './scheduleSaga';

import dotenv from 'dotenv';

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(PlaceSaga),
    fork(inquerySaga),
    fork(commentSaga),
    fork(reservationSaga),
    fork(officeSaga),
    fork(rentalSaga),
    fork(scheduleSaga),
  ]);
}
