import {
  ADD_OFFICE_REQUEST,
  DELETE_OFFICE_REQUEST,
  EDIT_OFFICE_REQUEST,
  LOADING_OFFICE_REQUEST,
} from 'redux/types/office_types';

export const loadOfficeAction = (id) => ({
  type: LOADING_OFFICE_REQUEST,
  payload: id,
});

export const officeAddAction = (data) => ({
  type: ADD_OFFICE_REQUEST,
  payload: data,
});

export const officeEditAction = (data) => ({
  type: EDIT_OFFICE_REQUEST,
  payload: data,
});

export const officeDeleteAction = (id) => ({
  type: DELETE_OFFICE_REQUEST,
  payload: id,
});
