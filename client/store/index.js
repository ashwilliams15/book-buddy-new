import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import authReducer from './auth';

const rootReducer = combineReducers({
  auth: authReducer
})

export default createStore(
  rootReducer,
  applyMiddleware(thunk, loggingMiddleware)
);
