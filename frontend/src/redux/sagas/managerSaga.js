import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  ADD_FACILITY_FAILURE,
  ADD_FACILITY_REQUEST,
  ADD_FACILITY_SUCCESS,
  DELETE_FACILITY_FAILURE,
  DELETE_FACILITY_REQUEST,
  DELETE_FACILITY_SUCCESS,
  EDIT_FACILITY_FAILURE,
  EDIT_FACILITY_REQUEST,
  EDIT_FACILITY_SUCCESS,
} from 'redux/types/manager_types';

// 시설물 추가
const addFacilityAPI = (payload) => {
  return axios.post('/facility', payload);
};

function* addFacility(action) {
  try {
    const result = yield call(addFacilityAPI, action.payload);

    console.log(result.data);

    yield put({
      type: ADD_FACILITY_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: ADD_FACILITY_FAILURE,
      payload: e,
    });
  }
}

function* watchaddFacility() {
  yield takeEvery(ADD_FACILITY_REQUEST, addFacility);
}

// 시설물 변경
const editFacilityAPI = (payload) => {
  return axios.put(`/facility/${payload.id}`, payload);
};

function* editFacility(action) {
  try {
    const result = yield call(editFacilityAPI, action.payload);

    yield put({
      type: EDIT_FACILITY_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: EDIT_FACILITY_FAILURE,
      payload: e,
    });
  }
}

function* watcheditFacility() {
  yield takeEvery(EDIT_FACILITY_REQUEST, editFacility);
}

// 시설물 삭제
const deleteFacilityAPI = (payload) => {
  return axios.post('/facility/delete', payload);
};

function* deleteFacility(action) {
  try {
    const result = yield call(deleteFacilityAPI, action.payload);

    yield put({
      type: DELETE_FACILITY_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: DELETE_FACILITY_FAILURE,
      payload: e,
    });
  }
}

function* watchdeleteFacility() {
  yield takeEvery(DELETE_FACILITY_REQUEST, deleteFacility);
}

export default function* managerSaga() {
  yield all([
    fork(watchaddFacility),
    fork(watcheditFacility),
    fork(watchdeleteFacility),
  ]);
}
