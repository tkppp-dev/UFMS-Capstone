import {
  ADD_FACILITY_REQUEST,
  DELETE_FACILITY_REQUEST,
  EDIT_FACILITY_REQUEST,
} from 'redux/types/manager_types';

export const addFacilityAction = (data) => ({
  type: ADD_FACILITY_REQUEST,
  payload: data,
});

export const editFacilityAction = (data) => ({
  type: EDIT_FACILITY_REQUEST,
  payload: data,
});

export const deleteFacilityAction = (facilityId) => ({
  type: DELETE_FACILITY_REQUEST,
  payload: facilityId,
});
