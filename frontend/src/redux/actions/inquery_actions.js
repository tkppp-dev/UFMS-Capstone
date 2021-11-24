import {
  INQUERIES_LOADING_REQUEST,
  INQUERY_DELETE_REQUEST,
  INQUERY_EDIT_REQUEST,
  INQUERY_LOADING_REQUEST,
  INQUERY_WRITE_REQUEST,
} from 'redux/types/inquery_types';

export const loadInqueriesAction = () => ({
  type: INQUERIES_LOADING_REQUEST,
});

export const loadInqueryAction = (id) => ({
  type: INQUERY_LOADING_REQUEST,
  payload: id,
});

export const inqueryWriteAction = (data) => ({
  type: INQUERY_WRITE_REQUEST,
  payload: data,
});

export const inqueryEditAction = (data) => ({
  type: INQUERY_EDIT_REQUEST,
  payload: data,
});

export const inqueryDeleteAction = (id) => ({
  type: INQUERY_DELETE_REQUEST,
  payload: id,
});
