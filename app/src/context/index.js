import React from 'react';
import { createContext, useReducer } from 'react';

const Context = createContext({});

const initialState = {
  user: {
    isLogin: false,
    jwtToken: null,
  },
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      state.user.isLogin = true;
      state.user.jwtToken = 'get token';
      return { ...state };
    case 'LOGOUT':
      state.user.isLogin = false;
      state.user.jwtToken = null;
      return { ...state };
  }
};

const Provider = function ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
