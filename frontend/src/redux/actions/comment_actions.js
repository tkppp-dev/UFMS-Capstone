import {
  COMMENTS_LOADING_REQUEST,
  DELETE_COMMENT_REQUEST,
  EDIT_COMMENT_REQUEST,
  UPLOAD_COMMENT_REQUEST,
} from 'redux/types/comment_types';

export const loadCommentsAction = (id) => ({
  type: COMMENTS_LOADING_REQUEST,
  payload: id,
});

export const commentUploadAction = (data) => ({
  type: UPLOAD_COMMENT_REQUEST,
  payload: data,
});

export const commentEditAction = (data) => ({
  type: EDIT_COMMENT_REQUEST,
  payload: data,
});

export const commentDeleteAction = (id) => ({
  type: DELETE_COMMENT_REQUEST,
  payload: id,
});
