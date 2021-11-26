import React, { createContext, useReducer } from 'react';

const InquiryContext = createContext({});

const initialState = {
  inquiryId: null,
  selectedIdx: null,
  title: '',
  content: '',
  inquiryList: [],
  updateModalVisible: false,
  deleteModalVisible: false,
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case 'SET_INQUIRY_LIST':
      state.inquiryList = action.inquiryList;
      return { ...state };
    case 'SET_INQUIRY':
      state.inquiryId = action.inquiryId;
      state.selectedIdx = action.idx;
      state.title = state.inquiryList[state.selectedIdx].title;
      state.content = state.inquiryList[state.selectedIdx].content;
      return { ...state };
    case 'SET_INQUIRY_ID':
      state.inquiryId = action.inquiryId;
      return { ...state };
    case 'SET_TITLE':
      state.title = action.title;
      return { ...state };
    case 'SET_CONTENT':
      state.content = action.content;
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

const InquiryProvider = function ({ children }) {
  const [inquiryState, dispatch] = useReducer(reducer, initialState);
  const value = { inquiryState, dispatch };

  return (
    <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>
  );
};

export { InquiryContext, InquiryProvider };
