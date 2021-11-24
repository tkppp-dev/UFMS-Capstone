import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  COMMENTS_LOADING_REQUEST,
  COMMENTS_LOADING_SUCCESS,
  COMMENTS_LOADING_FAILURE,
  UPLOAD_COMMENT_REQUEST,
  UPLOAD_COMMENT_SUCCESS,
  UPLOAD_COMMENT_FAILURE,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from 'redux/types/comment_types';

// Load All
const loadCommentsAPI = (id) => {
  return axios.get(`/inquery/${id}/comment`);
};

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.payload);

    yield put({
      type: COMMENTS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: COMMENTS_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchloadComments() {
  yield takeEvery(COMMENTS_LOADING_REQUEST, loadComments);
}

// Upload
const commentUploadAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { id } = payload;

  return axios.post(`/inquery/${id}/comment`, payload, config);
};

function* commentUpload(action) {
  try {
    const result = yield call(commentUploadAPI, action.payload);

    yield put({
      type: UPLOAD_COMMENT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: UPLOAD_COMMENT_FAILURE,
      payload: e,
    });
  }
}

function* watchcommentUpload() {
  yield takeEvery(UPLOAD_COMMENT_REQUEST, commentUpload);
}

// Edit
const commentEditAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { id, commentId } = payload;

  return axios.put(`/inquery/${id}/comment/${commentId}`, payload, config);
};

function* commentEditPlace(action) {
  try {
    const result = yield call(commentEditAPI, action.payload);

    yield put({
      type: EDIT_COMMENT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: EDIT_COMMENT_FAILURE,
      payload: e,
    });
  }
}

function* watchcommentEdit() {
  yield takeEvery(EDIT_COMMENT_REQUEST, commentEditPlace);
}

// Delete
const commentDeleteAPI = (payload) => {
  const { id, commentId } = payload;

  return axios.delete(`/inquery/${id}/comment/${commentId}`);
};

function* commentDelete(action) {
  try {
    const result = yield call(commentDeleteAPI, action.payload);

    yield put({
      type: DELETE_COMMENT_REQUEST,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: DELETE_COMMENT_SUCCESS,
      payload: e,
    });
  }
}

function* watchcommentDelete() {
  yield takeEvery(DELETE_COMMENT_FAILURE, commentDelete);
}

export default function* commentSaga() {
  yield all([
    fork(watchloadComments),
    fork(watchcommentUpload),
    fork(watchcommentEdit),
    fork(watchcommentDelete),
  ]);
}
