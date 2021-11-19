import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  PLACE_DELETE_FAILURE,
  PLACE_DELETE_REQUEST,
  PLACE_DELETE_SUCCESS,
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

// All Places Load
const loadPlaceAPI = (payload) => {
  return axios.get(`/api/place/skip/${payload}`);
};

function* loadPlaces(action) {
  try {
    const result = yield call(loadPlaceAPI, action.payload);

    yield put({
      type: PLACE_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PLACE_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchloadPlaces() {
  yield takeEvery(PLACE_LOADING_REQUEST, loadPlaces);
}

// Detail
const loadPlaceDetailAPI = (payload) => {
  return axios.get(`/api/place/${payload}`);
};

function* loadPlaceDetail(action) {
  try {
    const result = yield call(loadPlaceDetailAPI, action.payload);

    yield put({
      type: PLACE_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PLACE_DETAIL_LOADING_FAILURE,
      payload: e,
    });

    yield put(push('/'));
  }
}

function* watchloadPlaceDetail() {
  yield takeEvery(PLACE_DETAIL_LOADING_REQUEST, loadPlaceDetail);
}

// Place Delete
const deletePlaceAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = payload.token;
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return axios.delete(`/api/place/${payload.id}`, config);
};

function* deletePlace(action) {
  try {
    const result = yield call(deletePlaceAPI, action.payload);

    yield put({
      type: PLACE_DELETE_SUCCESS,
      payload: result.data,
    });

    yield put(push('/rent/place'));
  } catch (e) {
    yield put({
      type: PLACE_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchdeletePlace() {
  yield takeEvery(PLACE_DELETE_REQUEST, deletePlace);
}

// Place Upload
const uploadPlaceAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = payload.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return axios.post('/api/place/write', payload, config);
};

function* uploadPlace(action) {
  try {
    const result = yield call(uploadPlaceAPI, action.payload);

    yield put({
      type: PLACE_UPLOAD_SUCCESS,
      payload: result.data,
    });

    yield put(push(`/rent/place/${result.data._id}`));
  } catch (e) {
    yield put({
      type: PLACE_UPLOAD_FAILURE,
      payload: e,
    });
  }
}

function* watchuploadPlace() {
  yield takeEvery(PLACE_UPLOAD_REQUEST, uploadPlace);
}

// Place Edit Upload
const PlaceEditUploadAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = payload.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return axios.post(`api/place/${payload.id}/edit`, payload, config);
};

function* PlaceEditUpload(action) {
  try {
    const result = yield call(PlaceEditUploadAPI, action.payload);

    yield put({
      type: PLACE_EDIT_UPLOADING_SUCCESS,
      payload: result.data,
    });

    yield put(push(`/rent/place/${result.data._id}`));
  } catch (e) {
    yield put({
      type: PLACE_EDIT_UPLOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchPlaceEditUpload() {
  yield takeEvery(PLACE_EDIT_UPLOADING_REQUEST, PlaceEditUpload);
}

// Search
const SearchResultAPI = (payload) => {
  return axios.get(`/api/search/${encodeURIComponent(payload)}`);
};

function* SearchResult(action) {
  try {
    const result = yield call(SearchResultAPI, action.payload);

    yield put({
      type: SEARCH_SUCCESS,
      payload: result.data,
    });

    yield put(push(`/search/${encodeURIComponent(action.payload)}`));
  } catch (e) {
    yield put({
      type: SEARCH_FAILURE,
      payload: e,
    });

    action.put(push('/'));
  }
}

function* watchSearchResult() {
  yield takeEvery(SEARCH_REQUEST, SearchResult);
}

export default function* PlaceSaga() {
  yield all([
    fork(watchloadPlaces),
    fork(watchloadPlaceDetail),
    fork(watchdeletePlace),
    fork(watchuploadPlace),
    fork(watchPlaceEditUpload),
    fork(watchSearchResult),
  ]);
}
