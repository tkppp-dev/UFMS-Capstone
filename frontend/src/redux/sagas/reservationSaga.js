import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  BUILDING_LIST_FAILURE,
  BUILDING_LIST_REQUEST,
  BUILDING_LIST_SUCCESS,
  FLOOR_LIST_FAILURE,
  FLOOR_LIST_REQUEST,
  FLOOR_LIST_SUCCESS,
  RESERVATION_FAILURE,
  RESERVATION_REQUEST,
  RESERVATION_SUCCESS,
  RESERVATION_TIME_FAILURE,
  RESERVATION_TIME_REQUEST,
  RESERVATION_TIME_SUCCESS,
} from 'redux/types/reservation_types';

// 예약 가능한 빌딩 리스트
const buildingListAPI = () => {
  return axios.get('/reservation/building');
};

function* buildingList() {
  try {
    const result = yield call(buildingListAPI);

    yield put({
      type: BUILDING_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: BUILDING_LIST_FAILURE,
      payload: e,
    });
  }
}

function* watchbuildingList() {
  yield takeEvery(BUILDING_LIST_REQUEST, buildingList);
}

// 건물 층의 강의실 리스트
const floorListAPI = (payload) => {
  return axios.post('/reservation/building/floor', payload);
};

function* floorList(action) {
  try {
    const result = yield call(floorListAPI, action.payload);

    yield put({
      type: FLOOR_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: FLOOR_LIST_FAILURE,
      payload: e,
    });
  }
}

function* watchfloorList() {
  yield takeEvery(FLOOR_LIST_REQUEST, floorList);
}

// 예약 가능한 시간 리스트
const timeListAPI = (payload) => {
  return axios.post('/reservation/building/date', payload);
};

function* timeList(action) {
  try {
    const result = yield call(timeListAPI, action.payload);

    yield put({
      type: RESERVATION_TIME_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: RESERVATION_TIME_FAILURE,
      payload: e,
    });
  }
}

function* watchtimeList() {
  yield takeEvery(RESERVATION_TIME_REQUEST, timeList);
}

// 예약
const reservationAPI = (payload) => {
  return axios.post('/reservation', payload);
};

function* reservation(action) {
  try {
    const result = yield call(reservationAPI, action.payload);

    yield put({
      type: RESERVATION_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: RESERVATION_FAILURE,
      payload: e,
    });
  }
}

function* watchreservation() {
  yield takeEvery(RESERVATION_REQUEST, reservation);
}

export default function* reservationSaga() {
  yield all([
    fork(watchbuildingList),
    fork(watchfloorList),
    fork(watchtimeList),
    fork(watchreservation),
  ]);
}
