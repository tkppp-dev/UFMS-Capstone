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
  SEND_SUCCESS,
  SEND_FAILURE,
  SEND_REQUEST,
  AUTH_NUM_SUCCESS,
  AUTH_NUM_FAILURE,
  AUTH_NUM_REQUEST,
} from 'redux/types/user_types';

// LOGIN
const loginUserAPI = (data) => {
  return axios.post('/api/auth/login', data);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);

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
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.post('/api/user/register', data, config);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);

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

// 문자 보내기
const sendAPI = (data) => {
  return axios.post('/api/user/register/mobile', data);
};

function* send(action) {
  try {
    const result = yield call(sendAPI, action.payload);

    yield put({
      type: SEND_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SEND_FAILURE,
      payload: e.response,
    });
  }
}

function* watchsend() {
  yield takeEvery(SEND_REQUEST, send);
}

// 인증번호 인증
const authNumAPI = (data) => {
  return axios.post('/api/user/register/check', data);
};

function* authNum(action) {
  try {
    const result = yield call(authNumAPI, action.payload);

    yield put({
      type: AUTH_NUM_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: AUTH_NUM_FAILURE,
      payload: e.response,
    });
  }
}

function* watchauthNum() {
  yield takeEvery(AUTH_NUM_REQUEST, authNum);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchregisterUser),
    fork(watchuserLoading),
    fork(watchsend),
    fork(watchauthNum),
  ]);
}
