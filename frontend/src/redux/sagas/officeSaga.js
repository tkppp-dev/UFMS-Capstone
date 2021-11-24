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
  LOADING_OFFICE_FAILURE,
  LOADING_OFFICE_REQUEST,
  LOADING_OFFICE_SUCCESS,
} from 'redux/types/office_types';

// Load Office
const loadOfficeAPI = (id) => {
  return axios.get(`/schedule/lab/${id}`);
};

function* loadOffice(action) {
  try {
    const result = yield call(loadOfficeAPI, action.payload);

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

// Add
const officeAddAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.post('/schedule/lab', payload, config);
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
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.patch(`/schedule/lab/notice/${payload.id}`, payload, config);
};

function* editOffice(action) {
  try {
    const result = yield call(editOfficeAPI, action.payload);

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

// Delete
const deleteOfficeAPI = (id) => {
  return axios.delete(`/schedule/lab/${id}`);
};

function* deleteOffice(action) {
  try {
    const result = yield call(deleteOfficeAPI, action.payload);

    yield put({
      type: DELETE_OFFICE_REQUEST,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: DELETE_OFFICE_SUCCESS,
      payload: e,
    });
  }
}

function* watchdeleteOffice() {
  yield takeEvery(DELETE_OFFICE_FAILURE, deleteOffice);
}

export default function* officeSaga() {
  yield all([
    fork(watchloadOffice),
    fork(watchofficeAdd),
    fork(watcheditOffice),
    fork(watchdeleteOffice),
  ]);
}
