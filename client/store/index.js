import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import pantryReducer from './pantry'
import authReducer from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
  pantry: pantryReducer
})

export default createStore(
  rootReducer,
  applyMiddleware(thunk, loggingMiddleware)
);
