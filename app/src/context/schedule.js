import React, { createContext, useReducer } from 'react';

const ScheduleContext = createContext({});

const initialState = {
  schedule: {},
  updateModalVisible: false,
  deleteModalVisible: false,
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case 'SELECT_SCHEDULE':
      state.schedule = action.schedule;
      return { ...state };
    case 'UPDATE_MODAL_VISIBLE':
      state.updateModalVisible = true;
      return { ...state };
    case 'UPDATE_MODAL_DISMISS':
      state.updateModalVisible = false;
      return { ...state };
    case 'DELETE_MODAL_VISIBLE':
      state.deleteModalVisible = true;
      return { ...state };
    case 'DELETE_MODAL_DISMISS':
      state.deleteModalVisible = false;
      return { ...state };
  }
};

const ScheduleProvider = function ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>;
};

export { ScheduleContext, ScheduleProvider };
