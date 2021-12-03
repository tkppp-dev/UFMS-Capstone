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

const initialState = {
  isAuthenticated: null,
  loading: false,
  office: [],
  offices: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_OFFICE_REQUEST:
    case ADD_OFFICE_REQUEST:
    case EDIT_OFFICE_REQUEST:
    case DELETE_OFFICE_REQUEST:
    case EDIT_STATE_REQUEST:
    case GET_OFFICE_REQUEST:
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
    case GET_OFFICE_SUCCESS:
      return {
        ...state,
        loading: false,
        offices: action.payload,
      };

    case EDIT_OFFICE_SUCCESS:
      alert('공지사항 변경에 성공했습니다.');
      return {
        ...state,
        loading: false,
      };
    case EDIT_OFFICE_FAILURE:
      alert('공지사항 변경에 실패했습니다.');
      return {
        ...state,
        loading: false,
      };

    case EDIT_STATE_SUCCESS:
      alert('상태 변경에 성공했습니다.');
      return {
        ...state,
        loading: false,
      };
    case EDIT_STATE_FAILURE:
      alert('상태 변경에 실패했습니다.');
      return {
        ...state,
        loading: false,
      };

    case DELETE_OFFICE_SUCCESS:
    case GET_OFFICE_FAILURE:
    case ADD_OFFICE_SUCCESS:
    case LOADING_OFFICE_FAILURE:
    case ADD_OFFICE_FAILURE:
    case DELETE_OFFICE_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
