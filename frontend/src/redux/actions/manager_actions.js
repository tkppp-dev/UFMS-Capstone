import {
  ADD_BUILDING_REQUEST,
  ADD_FACILITY_REQUEST,
  DELETE_BUILDING_REQUEST,
  DELETE_FACILITY_REQUEST,
  EDIT_BUILDING_REQUEST,
  EDIT_FACILITY_REQUEST,
  RENTAL_LOADING_REQUEST,
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

export const addBuildingAction = (data) => ({
  type: ADD_BUILDING_REQUEST,
  payload: data,
});

export const editBuildingAction = (data) => ({
  type: EDIT_BUILDING_REQUEST,
  payload: data,
});

export const deleteBuildingAction = (scheduleId) => ({
  type: DELETE_BUILDING_REQUEST,
  payload: scheduleId,
});

export const loadingRentAction = (facilityName) => ({
  type: RENTAL_LOADING_REQUEST,
  payload: facilityName,
});
