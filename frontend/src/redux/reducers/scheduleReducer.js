import {
  SCHEDULE_DELETE_FAILURE,
  SCHEDULE_DELETE_REQUEST,
  SCHEDULE_DELETE_SUCCESS,
  SCHEDULE_LIST_FAILURE,
  SCHEDULE_LIST_REQUEST,
  SCHEDULE_LIST_SUCCESS,
} from 'redux/types/schedule_types';

const initialState = {
  loading: false,
  schedules: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SCHEDULE_LIST_REQUEST:
    case SCHEDULE_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SCHEDULE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        schedules: action.payload[0][0],
      };
    case SCHEDULE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case SCHEDULE_LIST_FAILURE:
    case SCHEDULE_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
