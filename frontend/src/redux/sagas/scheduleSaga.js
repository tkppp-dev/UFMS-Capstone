import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  SCHEDULE_DELETE_FAILURE,
  SCHEDULE_DELETE_REQUEST,
  SCHEDULE_DELETE_SUCCESS,
  SCHEDULE_LIST_FAILURE,
  SCHEDULE_LIST_REQUEST,
  SCHEDULE_LIST_SUCCESS,
} from 'redux/types/schedule_types';

// 스케줄 리스트
const scheduleListAPI = (payload) => {
  return axios.post('/schedule', payload);
};

function* scheduleList(action) {
  try {
    const result = yield call(scheduleListAPI, action.payload);

    yield put({
      type: SCHEDULE_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SCHEDULE_LIST_FAILURE,
      payload: e,
    });
  }
}

function* watchscheduleList() {
  yield takeEvery(SCHEDULE_LIST_REQUEST, scheduleList);
}

// 스케줄 삭제
const scheduleDeleteAPI = (payload) => {
  console.log(payload);
  return axios.post('/schedule/delete', payload);
};

function* scheduleDelete(action) {
  try {
    const result = yield call(scheduleDeleteAPI, action.payload);

    console.log(result.data);

    yield put({
      type: SCHEDULE_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SCHEDULE_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchscheduleDelete() {
  yield takeEvery(SCHEDULE_DELETE_REQUEST, scheduleDelete);
}

export default function* scheduleSaga() {
  yield all([fork(watchscheduleList), fork(watchscheduleDelete)]);
}
