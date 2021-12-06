import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_FAILURE,
  USER_LOADING_SUCCESS,
} from 'redux/types/user_types';

// LOGIN
const loginUserAPI = (data) => {
  return axios.post('/api/auth/login', data);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);

    console.log(result.data);

    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

// LOGOUT
const logoutAPI = (data) => {
  return axios.post('/api/auth/logout', data);
};

function* logoutUser(action) {
  try {
    const result = yield call(logoutAPI, action.payload);

    yield put({
      type: LOGOUT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLogoutUser() {
  yield takeEvery(LOGOUT_REQUEST, logoutUser);
}

// Register
const registerUserAPI = (data) => {
  return axios.post('/api/user/register', data);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);

    console.log(result);

    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchregisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

// User Loading
const userLoadingAPI = (id) => {
  return axios.get(`/api/auth/user/${id}`);
};

function* userLoading(action) {
  try {
    const result = yield call(userLoadingAPI, action.payload);

    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchuserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchregisterUser),
    fork(watchuserLoading),
  ]);
}
