import {
  ADD_BUILDING_FAILURE,
  ADD_BUILDING_REQUEST,
  ADD_BUILDING_SUCCESS,
  ADD_FACILITY_FAILURE,
  ADD_FACILITY_REQUEST,
  ADD_FACILITY_SUCCESS,
  DELETE_BUILDING_FAILURE,
  DELETE_BUILDING_REQUEST,
  DELETE_BUILDING_SUCCESS,
  DELETE_FACILITY_FAILURE,
  DELETE_FACILITY_REQUEST,
  DELETE_FACILITY_SUCCESS,
  EDIT_BUILDING_FAILURE,
  EDIT_BUILDING_REQUEST,
  EDIT_BUILDING_SUCCESS,
  EDIT_FACILITY_FAILURE,
  EDIT_FACILITY_REQUEST,
  EDIT_FACILITY_SUCCESS,
  RENTAL_LOADING_FAILURE,
  RENTAL_LOADING_REQUEST,
  RENTAL_LOADING_SUCCESS,
} from 'redux/types/manager_types';

const initialState = {
  loading: false,
  rentList: [],
};

const managerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FACILITY_REQUEST:
    case EDIT_FACILITY_REQUEST:
    case DELETE_FACILITY_REQUEST:
    case ADD_BUILDING_REQUEST:
    case EDIT_BUILDING_REQUEST:
    case DELETE_BUILDING_REQUEST:
    case RENTAL_LOADING_REQUEST:
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

    case ADD_BUILDING_SUCCESS:
      alert('시설 추가에 성공했습니다.');
      window.location.reload();

      return {
        ...state,
        loading: false,
      };
    case EDIT_BUILDING_SUCCESS:
      alert('건물 변경에 성공했습니다.');
      window.location.reload();

      return {
        ...state,
        loading: false,
      };
    case DELETE_BUILDING_SUCCESS:
      alert('건물 삭제에 성공했습니다.');

      return {
        ...state,
        loading: false,
      };
    case RENTAL_LOADING_SUCCESS:
      return {
        ...state,
        rentList: action.payload,
      };

    case RENTAL_LOADING_FAILURE:
    case DELETE_FACILITY_FAILURE:
    case EDIT_FACILITY_FAILURE:
    case ADD_FACILITY_FAILURE:
    case DELETE_BUILDING_FAILURE:
    case EDIT_BUILDING_FAILURE:
    case ADD_BUILDING_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default managerReducer;
