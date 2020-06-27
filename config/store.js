import {createStore} from 'redux';
import rootReducer from '../store/index';

const store = createStore(rootReducer);

export default store;
