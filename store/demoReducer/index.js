import {DEMO} from './actions';

const initialState = {
  data: {},
};

const demoReducer = (state = initialState, action) => {
  if (!action) return state;
  switch (action.type) {
    case DEMO: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default demoReducer;
