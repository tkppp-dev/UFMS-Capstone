import {
  BUILDING_IMAGE_REQUEST,
  BUILDING_LIST_REQUEST,
  DELETE_RESERVATION_REQUEST,
  FLOOR_LIST_REQUEST,
  FLOOR_NUM_LIST_REQUEST,
  RESERVATION_REQUEST,
  RESERVATION_TIME_REQUEST,
} from 'redux/types/reservation_types';

export const reservationAction = (data) => ({
  type: RESERVATION_REQUEST,
  payload: data,
});

export const reservationDeleteAction = (id) => ({
  type: DELETE_RESERVATION_REQUEST,
  payload: id,
});

export const buildingListAction = () => ({
  type: BUILDING_LIST_REQUEST,
});

export const floorNumListAction = (building) => ({
  type: FLOOR_NUM_LIST_REQUEST,
  payload: building,
});

export const floorListAction = (data) => ({
  type: FLOOR_LIST_REQUEST,
  payload: data,
});

export const buildingImageAction = (data) => ({
  type: BUILDING_IMAGE_REQUEST,
  payload: data,
});

export const reservationTimeAction = (data) => ({
  type: RESERVATION_TIME_REQUEST,
  payload: data,
});
