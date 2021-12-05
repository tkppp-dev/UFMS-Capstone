import {
  DELETE_COMMENT_SUCCESS,
  COMMENTS_LOADING_FAILURE,
  COMMENTS_LOADING_REQUEST,
  COMMENTS_LOADING_SUCCESS,
  UPLOAD_COMMENT_FAILURE,
  UPLOAD_COMMENT_REQUEST,
  UPLOAD_COMMENT_SUCCESS,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
} from '../types/comment_types';

const initialState = {
  comments: [],
  loading: false,
  errorMsg: '',
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_LOADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENTS_LOADING_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case COMMENTS_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case UPLOAD_COMMENT_REQUEST:
    case EDIT_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_COMMENT_SUCCESS:
    case EDIT_COMMENT_SUCCESS:
      window.location.reload();

      return {
        ...state,
        loading: false,
      };
    case UPLOAD_COMMENT_FAILURE:
    case EDIT_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case DELETE_COMMENT_SUCCESS:
      window.location.reload();

      return {
        ...state,
      };

    default:
      return state;
  }
};

export default commentReducer;
