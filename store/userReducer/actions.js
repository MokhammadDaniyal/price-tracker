export const LOGIN = 'LOGIN';

export const loginUser = data => {
  return {
    type: LOGIN,
    payload: {hasToken: true},
  };
};
