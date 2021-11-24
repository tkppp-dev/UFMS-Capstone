import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './authReducer';
import placeReducer from './placeReducer';
import inqueryReducer from './inqueryReducer';
import commentReducer from './commentReducer';
import reservationReducer from './reservationReducer';
import officeReducer from './officeReducer';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    place: placeReducer,
    inquery: inqueryReducer,
    comment: commentReducer,
    reservation: reservationReducer,
    office: officeReducer,
  });

export default createRootReducer;
