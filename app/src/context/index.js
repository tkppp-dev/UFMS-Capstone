import React, { createContext, useReducer } from 'react';

const Context = createContext({});

const initialState = {
  user: {
    isLogin: false,
  },
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      state.user.isLogin = true;
      state.user = { ...state.user, ...action.response}
      return { ...state };
    case 'LOGOUT':
      state.user.isLogin = false;
      state.user.accessToken = null;
      state.user.refreshToken = null;
      state.user.userInfo = {};
      return { ...state };
  }
};

const Provider = function ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
