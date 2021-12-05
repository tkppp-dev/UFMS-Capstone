import axios from 'axios';
import { push } from 'connected-react-router';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  INQUERIES_LOADING_REQUEST,
  INQUERIES_LOADING_SUCCESS,
  INQUERIES_LOADING_FAILURE,
  INQUERY_LOADING_REQUEST,
  INQUERY_LOADING_SUCCESS,
  INQUERY_LOADING_FAILURE,
  INQUERY_WRITE_REQUEST,
  INQUERY_WRITE_SUCCESS,
  INQUERY_WRITE_FAILURE,
  INQUERY_EDIT_REQUEST,
  INQUERY_EDIT_SUCCESS,
  INQUERY_EDIT_FAILURE,
  INQUERY_DELETE_REQUEST,
  INQUERY_DELETE_SUCCESS,
  INQUERY_DELETE_FAILURE,
} from 'redux/types/inquery_types';

// Load All Inqueries
const loadInqueriesAPI = () => {
  return axios.get('/inquiry');
};

function* loadInqueries() {
  try {
    const result = yield call(loadInqueriesAPI);

    yield put({
      type: INQUERIES_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: INQUERIES_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchloadInqueries() {
  yield takeEvery(INQUERIES_LOADING_REQUEST, loadInqueries);
}

// Load Inquery
const loadInqueryAPI = (id) => {
  return axios.get(`/inquiry/${id}`);
};

function* loadInquery(action) {
  try {
    const result = yield call(loadInqueryAPI, action.payload);

    yield put({
      type: INQUERY_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: INQUERY_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchloadInquery() {
  yield takeEvery(INQUERY_LOADING_REQUEST, loadInquery);
}

// Write
const inqueryWriteAPI = (payload) => {
  return axios.post('/inquiry', payload);
};

function* inqueryWritePlace(action) {
  try {
    const result = yield call(inqueryWriteAPI, action.payload);

    yield put({
      type: INQUERY_WRITE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: INQUERY_WRITE_FAILURE,
      payload: e,
    });
  }
}

function* watchinqueryWrite() {
  yield takeEvery(INQUERY_WRITE_REQUEST, inqueryWritePlace);
}

// Edit
const inqueryEditAPI = (payload) => {
  return axios.put(`/inquiry/${payload.id}`, payload);
};

function* inqueryEditPlace(action) {
  try {
    const result = yield call(inqueryEditAPI, action.payload);

    yield put({
      type: INQUERY_EDIT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: INQUERY_EDIT_FAILURE,
      payload: e,
    });
  }
}

function* watchinqueryEdit() {
  yield takeEvery(INQUERY_EDIT_REQUEST, inqueryEditPlace);
}

// Delete
const inqueryDeleteAPI = (payload) => {
  return axios.delete(`/inquiry/${payload}`);
};

function* inqueryDelete(action) {
  try {
    const result = yield call(inqueryDeleteAPI, action.payload);

    console.log('here');

    yield put({
      type: INQUERY_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: INQUERY_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchinqueryDelete() {
  yield takeEvery(INQUERY_DELETE_REQUEST, inqueryDelete);
}

export default function* inquerySaga() {
  yield all([
    fork(watchloadInqueries),
    fork(watchloadInquery),
    fork(watchinqueryWrite),
    fork(watchinqueryEdit),
    fork(watchinqueryDelete),
  ]);
}
