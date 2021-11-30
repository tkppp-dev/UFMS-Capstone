import {
  AUTH_NUM_REQUEST,
  GOOGLE_LOGIN_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  SEND_REQUEST,
  USER_EMAIL_AUTH_REQUEST,
  USER_LOADING_REQUEST,
} from 'redux/types/user_types';

export const loginAction = (user) => ({
  type: LOGIN_REQUEST,
  payload: user,
});

export const googleLoginAction = (user) => ({
  type: GOOGLE_LOGIN_REQUEST,
  payload: user,
});

export const logoutAction = (token) => ({
  type: LOGOUT_REQUEST,
  payload: token,
});

export const registerAction = (user) => ({
  type: REGISTER_REQUEST,
  payload: user,
});

export const loadUserAction = () => ({
  type: USER_LOADING_REQUEST,
  payload: localStorage.getItem('token'),
});

export const emailAuthAction = (email) => ({
  type: USER_EMAIL_AUTH_REQUEST,
  payload: email,
});

export const sendAction = (mobile) => ({
  type: SEND_REQUEST,
  payload: mobile,
});

export const authAction = (num) => ({
  type: AUTH_NUM_REQUEST,
  payload: num,
});
