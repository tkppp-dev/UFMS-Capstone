import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  AVAILABLE_FAILURE,
  AVAILABLE_REQUEST,
  AVAILABLE_SUCCESS,
  FACILITY_DETAIL_FAILURE,
  FACILITY_DETAIL_REQUEST,
  FACILITY_DETAIL_SUCCESS,
  RENTAL_LIST_FAILURE,
  RENTAL_LIST_REQUEST,
  RENTAL_LIST_SUCCESS,
  RENT_FAILURE,
  RENT_REQUEST,
  RENT_SUCCESS,
} from 'redux/types/rental_types';

const loadRentalListAPI = () => {
  return axios.get(`/rental`);
};

function* loadRentalList(action) {
  try {
    const result = yield call(loadRentalListAPI);

    yield put({
      type: RENTAL_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: RENTAL_LIST_FAILURE,
      payload: e,
    });
  }
}

function* watchloadRentalList() {
  yield takeEvery(RENTAL_LIST_REQUEST, loadRentalList);
}

// facility detail
const facilityDetailAPI = (payload) => {
  return axios.get(`/rental/${payload}`);
};

function* facilityDetail(action) {
  try {
    const result = yield call(facilityDetailAPI, action.payload);

    yield put({
      type: FACILITY_DETAIL_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: FACILITY_DETAIL_FAILURE,
      payload: e,
    });
  }
}

function* watchfacilityDetail() {
  yield takeEvery(FACILITY_DETAIL_REQUEST, facilityDetail);
}

// Available
const availableAPI = (payload) => {
  return axios.post('/rental/availability', payload);
};

function* available(action) {
  try {
    const result = yield call(availableAPI, action.payload);

    console.log(result.data);

    yield put({
      type: AVAILABLE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: AVAILABLE_FAILURE,
      payload: e,
    });
  }
}

function* watchavailable() {
  yield takeEvery(AVAILABLE_REQUEST, available);
}

// Rent
const rentAPI = (payload) => {
  return axios.post('/rental/r', payload);
};

function* rent(action) {
  try {
    const result = yield call(rentAPI, action.payload);

    console.log(result.data);

    yield put({
      type: RENT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: RENT_FAILURE,
      payload: e,
    });
  }
}

function* watchrent() {
  yield takeEvery(RENT_REQUEST, rent);
}

///////////////////////////////////////
export default function* RentalSaga() {
  yield all([
    fork(watchloadRentalList),
    fork(watchfacilityDetail),
    fork(watchavailable),
    fork(watchrent),
  ]);
}
