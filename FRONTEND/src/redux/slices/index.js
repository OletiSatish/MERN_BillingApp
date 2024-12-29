import { combineReducers } from 'redux';
import authReducer from './authSlice';
import itemReducer from './itemSlice';
import billingReducer from './billingSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  item: itemReducer,
  billing: billingReducer,
});

export default rootReducer;
