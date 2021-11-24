import {
  INQUERIES_LOADING_FAILURE,
  INQUERIES_LOADING_REQUEST,
  INQUERIES_LOADING_SUCCESS,
  INQUERY_EDIT_FAILURE,
  INQUERY_EDIT_REQUEST,
  INQUERY_EDIT_SUCCESS,
  INQUERY_LOADING_FAILURE,
  INQUERY_LOADING_REQUEST,
  INQUERY_LOADING_SUCCESS,
  INQUERY_WRITE_FAILURE,
  INQUERY_WRITE_REQUEST,
  INQUERY_WRITE_SUCCESS,
} from 'redux/types/inquery_types';

const initialState = {
  isAuthenticated: null,
  inqueries: [],
  inqueryDetail: '',
  loading: false,
  error: '',
  title: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INQUERIES_LOADING_REQUEST:
    case INQUERY_LOADING_REQUEST:
    case INQUERY_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INQUERIES_LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        inqueries: action.payload,
      };
    case INQUERIES_LOADING_FAILURE:
    case INQUERY_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case INQUERY_LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        inqueryDetail: action.payload,
      };

    case INQUERY_WRITE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INQUERY_WRITE_SUCCESS:
    case INQUERY_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case INQUERY_WRITE_FAILURE:
    case INQUERY_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
