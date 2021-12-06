import {
  AVAILABLE_REQUEST,
  FACILITY_DETAIL_REQUEST,
  RENTAL_LIST_REQUEST,
  RENT_REQUEST,
} from 'redux/types/rental_types';

export const rentalListAction = () => ({
  type: RENTAL_LIST_REQUEST,
});

export const facilityDetailAction = (facilityName) => ({
  type: FACILITY_DETAIL_REQUEST,
  payload: facilityName,
});

export const availableAction = (data) => ({
  type: AVAILABLE_REQUEST,
  payload: data,
});

export const rentAction = (data) => ({
  type: RENT_REQUEST,
  payload: data,
});
