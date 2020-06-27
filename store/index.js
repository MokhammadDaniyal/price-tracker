import {combineReducers} from 'redux';
import demoReducer from './demoReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  demoReducer: demoReducer,
  user: userReducer,
});

export default rootReducer;
