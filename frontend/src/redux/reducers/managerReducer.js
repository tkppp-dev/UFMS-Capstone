import {
  ADD_FACILITY_FAILURE,
  ADD_FACILITY_REQUEST,
  ADD_FACILITY_SUCCESS,
  DELETE_FACILITY_FAILURE,
  DELETE_FACILITY_REQUEST,
  DELETE_FACILITY_SUCCESS,
  EDIT_FACILITY_FAILURE,
  EDIT_FACILITY_REQUEST,
  EDIT_FACILITY_SUCCESS,
} from 'redux/types/manager_types';

const initialState = {
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FACILITY_REQUEST:
    case EDIT_FACILITY_REQUEST:
    case DELETE_FACILITY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_FACILITY_SUCCESS:
      alert('시설 추가에 성공했습니다.');

      return {
        ...state,
        loading: false,
      };
    case EDIT_FACILITY_SUCCESS:
      alert('시설 변경에 성공했습니다.');

      return {
        ...state,
        loading: false,
      };
    case DELETE_FACILITY_SUCCESS:
      alert('시설 삭제에 성공했습니다.');

      return {
        ...state,
        loading: false,
      };

    case DELETE_FACILITY_FAILURE:
    case EDIT_FACILITY_FAILURE:
    case ADD_FACILITY_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
