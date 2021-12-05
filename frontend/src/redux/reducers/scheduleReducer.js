import {
  NOTICE_FAILURE,
  NOTICE_REQUEST,
  NOTICE_SUCCESS,
  SCHEDULE_ADD_FAILURE,
  SCHEDULE_ADD_REQUEST,
  SCHEDULE_ADD_SUCCESS,
  SCHEDULE_DELETE_FAILURE,
  SCHEDULE_DELETE_REQUEST,
  SCHEDULE_DELETE_SUCCESS,
  SCHEDULE_FAILURE,
  SCHEDULE_LIST_FAILURE,
  SCHEDULE_LIST_REQUEST,
  SCHEDULE_LIST_SUCCESS,
  SCHEDULE_NEXT_FAILURE,
  SCHEDULE_NEXT_REQUEST,
  SCHEDULE_NEXT_SUCCESS,
  SCHEDULE_NOW_FAILURE,
  SCHEDULE_NOW_REQUEST,
  SCHEDULE_NOW_SUCCESS,
  SCHEDULE_REQUEST,
  SCHEDULE_SUCCESS,
  SEARCH_SUBJECT_FAILURE,
  SEARCH_SUBJECT_REQUEST,
  SEARCH_SUBJECT_SUCCESS,
} from 'redux/types/schedule_types';

const initialState = {
  loading: false,
  schedule: [],
  schedules: [],
  subjects: [],
  notices: [],
  now: '',
  next: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SCHEDULE_LIST_REQUEST:
    case SCHEDULE_DELETE_REQUEST:
    case SCHEDULE_NOW_REQUEST:
    case SCHEDULE_NEXT_REQUEST:
    case SEARCH_SUBJECT_REQUEST:
    case SCHEDULE_ADD_REQUEST:
    case NOTICE_REQUEST:
    case SCHEDULE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SCHEDULE_SUCCESS:
      return {
        ...state,
        loading: false,
        schedule: action.payload,
      };
    case SCHEDULE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        schedules: action.payload,
      };
    case SCHEDULE_DELETE_SUCCESS:
      window.location.reload();
      return {
        ...state,
        loading: false,
      };
    case SCHEDULE_NOW_SUCCESS:
      return {
        ...state,
        loading: false,
        now: action.payload,
      };
    case SCHEDULE_NEXT_SUCCESS:
      return {
        ...state,
        loading: false,
        next: action.payload,
      };
    case SEARCH_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        subjects: action.payload,
      };
    case SCHEDULE_ADD_SUCCESS:
      alert('스케줄이 추가었습니다.');

      return {
        ...state,
        loading: false,
      };
    case NOTICE_SUCCESS:
      return {
        ...state,
        loading: false,
        notices: action.payload,
      };

    case NOTICE_FAILURE:
    case SCHEDULE_FAILURE:
    case SCHEDULE_ADD_FAILURE:
    case SCHEDULE_LIST_FAILURE:
    case SCHEDULE_DELETE_FAILURE:
    case SCHEDULE_NOW_FAILURE:
    case SCHEDULE_NEXT_FAILURE:
    case SEARCH_SUBJECT_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
