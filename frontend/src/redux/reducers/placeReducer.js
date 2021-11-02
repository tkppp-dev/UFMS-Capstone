import {
  PLACE_DETAIL_LOADING_FAILURE,
  PLACE_DETAIL_LOADING_REQUEST,
  PLACE_DETAIL_LOADING_SUCCESS,
  PLACE_EDIT_UPLOADING_FAILURE,
  PLACE_EDIT_UPLOADING_REQUEST,
  PLACE_EDIT_UPLOADING_SUCCESS,
  PLACE_LOADING_FAILURE,
  PLACE_LOADING_REQUEST,
  PLACE_LOADING_SUCCESS,
  PLACE_UPLOAD_FAILURE,
  PLACE_UPLOAD_REQUEST,
  PLACE_UPLOAD_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
} from '../types/place_types';

const initialState = {
  isAuthenticated: null,
  places: [],
  placeDetail: '',
  placeCount: '',
  loading: false,
  error: '',
  creatorId: '',
  title: '',
  searchBy: '',
  searchResult: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PLACE_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PLACE_LOADING_SUCCESS:
      return {
        ...state,
        places: [...state.places, ...action.payload.placeFindResult],
        placeCount: action.payload.placeCount,
        loading: false,
      };
    case PLACE_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case PLACE_DETAIL_LOADING_REQUEST:
      return {
        ...state,
        places: [],
        loading: true,
      };
    case PLACE_DETAIL_LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        placeDetail: action.payload,
        creatorId: action.payload.creator._id,
        title: action.payload.title,
      };
    case PLACE_DETAIL_LOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case PLACE_UPLOAD_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case PLACE_UPLOAD_SUCCESS:
      return {
        ...state,
        places: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case PLACE_UPLOAD_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // Edit Uploading
    case PLACE_EDIT_UPLOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PLACE_EDIT_UPLOADING_SUCCESS:
      return {
        ...state,
        places: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case PLACE_EDIT_UPLOADING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // Search
    case SEARCH_REQUEST:
      return {
        ...state,
        places: [],
        searchBy: action.payload,
        loading: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchBy: action.payload,
        searchResult: action.payload,
        loading: false,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        searchResult: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
