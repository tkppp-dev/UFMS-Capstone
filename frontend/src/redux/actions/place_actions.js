import {
  PLACE_DELETE_REQUEST,
  PLACE_DETAIL_LOADING_REQUEST,
  PLACE_EDIT_UPLOADING_REQUEST,
  PLACE_LOADING_REQUEST,
  PLACE_UPLOAD_REQUEST,
  SEARCH_REQUEST,
} from 'redux/types/place_types';

export const loadAllPlaceAction = () => ({
  type: PLACE_LOADING_REQUEST,
});

export const detailLoadingAction = (id) => ({
  type: PLACE_DETAIL_LOADING_REQUEST,
  payload: id,
});

export const deletePlaceAction = (info) => ({
  // info = id, token
  type: PLACE_DELETE_REQUEST,
  payload: info,
});

export const editPlaceAction = (place) => ({
  type: PLACE_EDIT_UPLOADING_REQUEST,
  payload: place,
});

export const writePlaceAction = (place) => ({
  type: PLACE_UPLOAD_REQUEST,
  payload: place,
});

export const searchAction = (searchTerm) => ({
  type: SEARCH_REQUEST,
  payload: searchTerm,
});
