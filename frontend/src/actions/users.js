export const USER_LOGIN_REQUEST = "[USER]_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "[USER]_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "[USER]_LOGIN_FAILURE";

export const loginUser = user => ({
  type: USER_LOGIN_REQUEST,
  user
});

export const loginUserSuccess = token => ({
  type: USER_LOGIN_SUCCESS,
  token
});

export const loginUserFailure = error => ({
  type: USER_LOGIN_FAILURE,
  error
});

export const USER_REGISTER_REQUEST = "[USER]_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "[USER]_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "[USER]_REGISTER_FAILURE";

export const registerUser = () => ({
  type: USER_REGISTER_REQUEST
});

export const registerUserSuccess = token => ({
  type: USER_REGISTER_SUCCESS,
  token
});

export const registerUserFailure = error => ({
  type: USER_REGISTER_FAILURE,
  error
});
