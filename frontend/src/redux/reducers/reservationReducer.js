import { Result } from 'antd';
import {
  BUILDING_LIST_FAILURE,
  BUILDING_LIST_REQUEST,
  BUILDING_LIST_SUCCESS,
  FLOOR_LIST_FAILURE,
  FLOOR_LIST_REQUEST,
  FLOOR_LIST_SUCCESS,
  FLOOR_NUM_LIST_FAILURE,
  FLOOR_NUM_LIST_REQUEST,
  FLOOR_NUM_LIST_SUCCESS,
  RESERVATION_REQUEST,
  RESERVATION_SUCCESS,
} from 'redux/types/reservation_types';

const initialState = {
  loading: false,
  buildings: [],
  classes: [],
  timeSet: [],
  floors: [],
  classes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESERVATION_REQUEST:
    case BUILDING_LIST_REQUEST:
    case FLOOR_LIST_REQUEST:
    case FLOOR_NUM_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case BUILDING_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        buildings: action.payload,
      };

    case BUILDING_LIST_FAILURE:
    case FLOOR_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case FLOOR_NUM_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        floors: action.payload,
      };

    case FLOOR_NUM_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case FLOOR_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        classes: action.payload,
      };

    case RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
