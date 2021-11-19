import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
} from 'redux/types/user_types';

const initialState = {
  token: localStorage.getItem('accessToken'),
  isAuthenticated: false,
  isLoading: false,
  user: '',
  userId: '',
  userName: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case GOOGLE_LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
    case GOOGLE_LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('accessToken', action.payload.data.accessToken);
      localStorage.setItem('refreshToken', action.payload.data.refreshToken);

      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.data,
        userId: action.payload.data.id,
        userName: action.payload.data.username,
      };
    case LOGIN_FAILURE:
    case GOOGLE_LOGIN_FAILURE:
    case REGISTER_FAILURE:
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      return {
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
      };

    case USER_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADING_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        userId: action.payload.id,
        userName: action.payload.username,
      };
    case USER_LOADING_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
