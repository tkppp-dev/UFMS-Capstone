import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  NOTICE_FAILURE,
  NOTICE_REQUEST,
  NOTICE_SUCCESS,
  SCHEDULE_ADD_FAILURE,
  SCHEDULE_ADD_REQUEST,
  SCHEDULE_ADD_SUCCESS,
  SCHEDULE_DELETE_FAILURE,
  SCHEDULE_DELETE_REQUEST,
  SCHEDULE_DELETE_SUCCESS,
  SCHEDULE_FAILURE,
  SCHEDULE_LIST_FAILURE,
  SCHEDULE_LIST_REQUEST,
  SCHEDULE_LIST_SUCCESS,
  SCHEDULE_NEXT_FAILURE,
  SCHEDULE_NEXT_REQUEST,
  SCHEDULE_NEXT_SUCCESS,
  SCHEDULE_NOW_FAILURE,
  SCHEDULE_NOW_REQUEST,
  SCHEDULE_NOW_SUCCESS,
  SCHEDULE_REQUEST,
  SCHEDULE_SUCCESS,
  SEARCH_SUBJECT_FAILURE,
  SEARCH_SUBJECT_REQUEST,
  SEARCH_SUBJECT_SUCCESS,
} from 'redux/types/schedule_types';

// 스케줄 리스트
const scheduleListAPI = (payload) => {
  return axios.get(`/schedule/subject/${payload}`);
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

// 스케줄 리스트
const scheduleAPI = (payload) => {
  return axios.post(`/schedule`, payload);
};

function* schedule(action) {
  try {
    const result = yield call(scheduleAPI, action.payload);

    yield put({
      type: SCHEDULE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SCHEDULE_FAILURE,
      payload: e,
    });
  }
}

function* watchschedule() {
  yield takeEvery(SCHEDULE_REQUEST, schedule);
}

// 스케줄 추가
const scheduleAddAPI = (payload) => {
  return axios.post('/schedule/add', payload);
};

function* scheduleAdd(action) {
  try {
    const result = yield call(scheduleAddAPI, action.payload);

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
  const data = {
    scheduleId: payload,
  };

  return axios.post('/schedule/delete', data);
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

const noticeAPI = (payload) => {
  return axios.get(`/notification/${payload}`);
};

function* notice(action) {
  try {
    const result = yield call(noticeAPI, action.payload);

    yield put({
      type: NOTICE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: NOTICE_FAILURE,
      payload: e,
    });
  }
}

function* watchnotice() {
  yield takeEvery(NOTICE_REQUEST, notice);
}

export default function* scheduleSaga() {
  yield all([
    fork(watchscheduleList),
    fork(watchscheduleDelete),
    fork(watchscheduleNext),
    fork(watchscheduleNow),
    fork(watchsearchSubject),
    fork(watchscheduleAdd),
    fork(watchnotice),
    fork(watchschedule),
  ]);
}
