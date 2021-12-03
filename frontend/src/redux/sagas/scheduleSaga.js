import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  SCHEDULE_ADD_FAILURE,
  SCHEDULE_ADD_REQUEST,
  SCHEDULE_ADD_SUCCESS,
  SCHEDULE_DELETE_FAILURE,
  SCHEDULE_DELETE_REQUEST,
  SCHEDULE_DELETE_SUCCESS,
  SCHEDULE_LIST_FAILURE,
  SCHEDULE_LIST_REQUEST,
  SCHEDULE_LIST_SUCCESS,
  SCHEDULE_NEXT_FAILURE,
  SCHEDULE_NEXT_REQUEST,
  SCHEDULE_NEXT_SUCCESS,
  SCHEDULE_NOW_FAILURE,
  SCHEDULE_NOW_REQUEST,
  SCHEDULE_NOW_SUCCESS,
  SEARCH_SUBJECT_FAILURE,
  SEARCH_SUBJECT_REQUEST,
  SEARCH_SUBJECT_SUCCESS,
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

// 스케줄 추가
const scheduleAddAPI = (payload) => {
  console.log(payload);

  return axios.post('/schedule/add', payload);
};

function* scheduleAdd(action) {
  try {
    const result = yield call(scheduleAddAPI, action.payload);

    console.log(result.data);

    yield put({
      type: SCHEDULE_ADD_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SCHEDULE_ADD_FAILURE,
      payload: e,
    });
  }
}

function* watchscheduleAdd() {
  yield takeEvery(SCHEDULE_ADD_REQUEST, scheduleAdd);
}

// 스케줄 삭제
const scheduleDeleteAPI = (payload) => {
  return axios.post('/schedule/delete', payload);
};

function* scheduleDelete(action) {
  try {
    const result = yield call(scheduleDeleteAPI, action.payload);

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

// 현재 스케줄
const scheduleNowAPI = (payload) => {
  return axios.get(`/schedule/now/${payload}`);
};

function* scheduleNow(action) {
  try {
    const result = yield call(scheduleNowAPI, action.payload);

    yield put({
      type: SCHEDULE_NOW_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SCHEDULE_NOW_FAILURE,
      payload: e,
    });
  }
}

function* watchscheduleNow() {
  yield takeEvery(SCHEDULE_NOW_REQUEST, scheduleNow);
}

// 다음 스케줄
const scheduleNextAPI = (payload) => {
  return axios.get(`/schedule/next/${payload}`);
};

function* scheduleNext(action) {
  try {
    const result = yield call(scheduleNextAPI, action.payload);

    yield put({
      type: SCHEDULE_NEXT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SCHEDULE_NEXT_FAILURE,
      payload: e,
    });
  }
}

function* watchscheduleNext() {
  yield takeEvery(SCHEDULE_NEXT_REQUEST, scheduleNext);
}

// Search Subject
const searchSubjectAPI = (payload) => {
  return axios.post('/schedule/subject', payload);
};

function* searchSubject(action) {
  try {
    const result = yield call(searchSubjectAPI, action.payload);

    yield put({
      type: SEARCH_SUBJECT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SEARCH_SUBJECT_FAILURE,
      payload: e,
    });
  }
}

function* watchsearchSubject() {
  yield takeEvery(SEARCH_SUBJECT_REQUEST, searchSubject);
}

export default function* scheduleSaga() {
  yield all([
    fork(watchscheduleList),
    fork(watchscheduleDelete),
    fork(watchscheduleNext),
    fork(watchscheduleNow),
    fork(watchsearchSubject),
    fork(watchscheduleAdd),
  ]);
}
