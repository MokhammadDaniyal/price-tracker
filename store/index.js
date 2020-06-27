import {combineReducers} from 'redux';
import demoReducer from './demoReducer';

const rootReducer = combineReducers({
  demoReducer: demoReducer,
});

export default rootReducer;
