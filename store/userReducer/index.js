import {LOGIN} from './actions';

const initialState = {
  hasToken: false,
};

const userReducer = (state = initialState, action) => {
  if (!action) return state;
  switch (action.type) {
    case LOGIN: {
      return {state, ...action.payload};
    }
    default:
      return state;
  }
};

export default userReducer;
