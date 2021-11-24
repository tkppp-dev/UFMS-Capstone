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

const initialState = {
  isAuthenticated: null,
  loading: false,
  office: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_OFFICE_REQUEST:
    case ADD_OFFICE_REQUEST:
    case EDIT_OFFICE_REQUEST:
    case DELETE_OFFICE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOADING_OFFICE_SUCCESS:
      return {
        ...state,
        loading: false,
        office: action.payload,
      };

    case DELETE_OFFICE_SUCCESS:
    case EDIT_OFFICE_SUCCESS:
    case ADD_OFFICE_SUCCESS:
    case LOADING_OFFICE_FAILURE:
    case ADD_OFFICE_FAILURE:
    case EDIT_OFFICE_FAILURE:
    case DELETE_OFFICE_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
