import {
  AVAILABLE_FAILURE,
  AVAILABLE_REQUEST,
  AVAILABLE_SUCCESS,
  FACILITY_DETAIL_FAILURE,
  FACILITY_DETAIL_REQUEST,
  FACILITY_DETAIL_SUCCESS,
  RENTAL_LIST_FAILURE,
  RENTAL_LIST_REQUEST,
  RENTAL_LIST_SUCCESS,
  RENT_FAILURE,
  RENT_REQUEST,
  RENT_SUCCESS,
} from 'redux/types/rental_types';

const initialState = {
  isAuthenticated: null,
  loading: false,
  facilities: [],
  facility: '',
  isAvailable: '',
  rentSuccess: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RENTAL_LIST_REQUEST:
    case FACILITY_DETAIL_REQUEST:
    case AVAILABLE_REQUEST:
    case RENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case RENTAL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        facilities: action.payload,
      };
    case FACILITY_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        facility: action.payload,
      };
    case AVAILABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAvailable: action.payload,
      };
    case RENT_SUCCESS:
      alert('대관 신청이 완료되었습니다.');

      return {
        ...state,
        loading: false,
        rentSuccess: action.payload,
      };

    case RENTAL_LIST_FAILURE:
    case FACILITY_DETAIL_FAILURE:
    case AVAILABLE_FAILURE:
    case RENT_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
