import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  ADD_BUILDING_FAILURE,
  ADD_BUILDING_REQUEST,
  ADD_BUILDING_SUCCESS,
  ADD_FACILITY_FAILURE,
  ADD_FACILITY_REQUEST,
  ADD_FACILITY_SUCCESS,
  DELETE_BUILDING_FAILURE,
  DELETE_BUILDING_REQUEST,
  DELETE_BUILDING_SUCCESS,
  DELETE_FACILITY_FAILURE,
  DELETE_FACILITY_REQUEST,
  DELETE_FACILITY_SUCCESS,
  EDIT_BUILDING_FAILURE,
  EDIT_BUILDING_REQUEST,
  EDIT_BUILDING_SUCCESS,
  EDIT_FACILITY_FAILURE,
  EDIT_FACILITY_REQUEST,
  EDIT_FACILITY_SUCCESS,
  RENTAL_LOADING_FAILURE,
  RENTAL_LOADING_REQUEST,
  RENTAL_LOADING_SUCCESS,
} from 'redux/types/manager_types';

// 시설물 추가
const addFacilityAPI = (payload) => {
  return axios.post('/facility', payload);
};

function* addFacility(action) {
  try {
    const result = yield call(addFacilityAPI, action.payload);

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

// 건물 추가
const addBuildingAPI = (payload) => {
  return axios.post('/building', payload);
};

function* addBuilding(action) {
  try {
    const result = yield call(addBuildingAPI, action.payload);

    yield put({
      type: ADD_BUILDING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: ADD_BUILDING_FAILURE,
      payload: e,
    });
  }
}

function* watchaddBuilding() {
  yield takeEvery(ADD_BUILDING_REQUEST, addBuilding);
}

// 건물 변경
const editBuildingAPI = (payload) => {
  return axios.put(`/building/${payload.id}`, payload);
};

function* editBuilding(action) {
  try {
    const result = yield call(editBuildingAPI, action.payload);

    yield put({
      type: EDIT_BUILDING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: EDIT_BUILDING_FAILURE,
      payload: e,
    });
  }
}

function* watcheditBuilding() {
  yield takeEvery(EDIT_BUILDING_REQUEST, editBuilding);
}

// 건물 삭제
const deleteBuildingAPI = (payload) => {
  return axios.post('/building/delete', payload);
};

function* deleteBuilding(action) {
  try {
    const result = yield call(deleteBuildingAPI, action.payload);

    yield put({
      type: DELETE_BUILDING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: DELETE_BUILDING_FAILURE,
      payload: e,
    });
  }
}

function* watchdeleteBuilding() {
  yield takeEvery(DELETE_BUILDING_REQUEST, deleteBuilding);
}

// 대관 신청 리스트
const loadingRentAPI = (payload) => {
  return axios.get(`/rental/check/${payload}`);
};

function* loadingRent(action) {
  try {
    const result = yield call(loadingRentAPI, action.payload);

    yield put({
      type: RENTAL_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: RENTAL_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchloadingRent() {
  yield takeEvery(RENTAL_LOADING_REQUEST, loadingRent);
}

export default function* managerSaga() {
  yield all([
    fork(watchaddFacility),
    fork(watcheditFacility),
    fork(watchdeleteFacility),
    fork(watchaddBuilding),
    fork(watcheditBuilding),
    fork(watchdeleteBuilding),
    fork(watchloadingRent),
  ]);
}
