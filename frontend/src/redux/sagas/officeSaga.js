import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  ADD_OFFICE_FAILURE,
  ADD_OFFICE_REQUEST,
  ADD_OFFICE_SUCCESS,
  DELETE_OFFICE_FAILURE,
  DELETE_OFFICE_REQUEST,
  DELETE_OFFICE_SUCCESS,
  EDIT_OFFICE_FAILURE,
  EDIT_OFFICE_REQUEST,
  EDIT_OFFICE_SUCCESS,
  EDIT_STATE_FAILURE,
  EDIT_STATE_REQUEST,
  EDIT_STATE_SUCCESS,
  GET_OFFICE_FAILURE,
  GET_OFFICE_REQUEST,
  GET_OFFICE_SUCCESS,
  LOADING_OFFICE_FAILURE,
  LOADING_OFFICE_REQUEST,
  LOADING_OFFICE_SUCCESS,
} from 'redux/types/office_types';

// Load Office
const loadOfficeAPI = (payload) => {
  return axios.post(`/schedule/lab/professor`, payload);
};

function* loadOffice(action) {
  try {
    const result = yield call(loadOfficeAPI, action.payload);

    console.log(result.data);
    yield put({
      type: LOADING_OFFICE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOADING_OFFICE_FAILURE,
      payload: e,
    });
  }
}

function* watchloadOffice() {
  yield takeEvery(LOADING_OFFICE_REQUEST, loadOffice);
}

const getOfficeAPI = (payload) => {
  return axios.post('/schedule/lab/professor', payload);
};

function* getOffice(action) {
  try {
    const result = yield call(getOfficeAPI, action.payload);

    yield put({
      type: GET_OFFICE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: GET_OFFICE_FAILURE,
      payload: e,
    });
  }
}

function* watchgetOffice() {
  yield takeEvery(GET_OFFICE_REQUEST, getOffice);
}

// Add
const officeAddAPI = (payload) => {
  return axios.post('/schedule/lab', payload);
};

function* officeAdd(action) {
  try {
    const result = yield call(officeAddAPI, action.payload);

    yield put({
      type: ADD_OFFICE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: ADD_OFFICE_FAILURE,
      payload: e,
    });
  }
}

function* watchofficeAdd() {
  yield takeEvery(ADD_OFFICE_REQUEST, officeAdd);
}

// Edit
const editOfficeAPI = (payload) => {
  return axios.put(`/schedule/lab/notice/${payload.id}`, payload);
};

function* editOffice(action) {
  try {
    const result = yield call(editOfficeAPI, action.payload);

    console.log(result.data);

    yield put({
      type: EDIT_OFFICE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: EDIT_OFFICE_FAILURE,
      payload: e,
    });
  }
}

function* watcheditOffice() {
  yield takeEvery(EDIT_OFFICE_REQUEST, editOffice);
}

// Edit State
const editStateAPI = (payload) => {
  return axios.put(`/schedule/lab/state/${payload.id}`, payload);
};

function* editState(action) {
  try {
    const result = yield call(editStateAPI, action.payload);

    yield put({
      type: EDIT_STATE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: EDIT_STATE_FAILURE,
      payload: e,
    });
  }
}

function* watcheditState() {
  yield takeEvery(EDIT_STATE_REQUEST, editState);
}

// Delete
const deleteOfficeAPI = (id) => {
  return axios.delete(`/schedule/lab/${id}`);
};

function* deleteOffice(action) {
  try {
    const result = yield call(deleteOfficeAPI, action.payload);

    console.log(result.data);

    yield put({
      type: DELETE_OFFICE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: DELETE_OFFICE_FAILURE,
      payload: e,
    });
  }
}

function* watchdeleteOffice() {
  yield takeEvery(DELETE_OFFICE_REQUEST, deleteOffice);
}

export default function* officeSaga() {
  yield all([
    fork(watchloadOffice),
    fork(watchofficeAdd),
    fork(watchgetOffice),
    fork(watcheditOffice),
    fork(watchdeleteOffice),
    fork(watcheditState),
  ]);
}
