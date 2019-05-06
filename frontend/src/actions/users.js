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

export const USER_LOGOUT_REQUEST = "[USER]_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "[USER]_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILURE = "[USER]_LOGOUT_FAILURE";

export const logoutUser = () => ({
  type: USER_LOGOUT_REQUEST
});

export const logoutUserSuccess = () => ({
  type: USER_LOGOUT_SUCCESS
});

export const logoutUserFailure = error => ({
  type: USER_LOGOUT_FAILURE,
  error
});

export const USER_REGISTER_REQUEST = "[USER]_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "[USER]_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "[USER]_REGISTER_FAILURE";

export const registerUser = user => ({
  type: USER_REGISTER_REQUEST,
  user
});

export const registerUserSuccess = token => ({
  type: USER_REGISTER_SUCCESS,
  token
});

export const registerUserFailure = error => ({
  type: USER_REGISTER_FAILURE,
  error
});

export const USER_VERIFY_REQUEST = "[USER]_VERIFY_REQUEST";
export const USER_VERIFY_SUCCESS = "[USER]_VERIFY_SUCCESS";
export const USER_VERIFY_FAILURE = "[USER]_VERIFY_FAILURE";

export const verifyUser = verifyToken => ({
  type: USER_VERIFY_REQUEST,
  verifyToken
});

export const verifyUserSuccess = () => ({
  type: USER_VERIFY_SUCCESS
});

export const verifyUserFailure = error => ({
  type: USER_VERIFY_FAILURE,
  error
});

export const USER_REMOVE_REQUEST = "[USER]_REMOVE_REQUEST";
export const USER_REMOVE_SUCCESS = "[USER]_REMOVE_SUCCESS";
export const USER_REMOVE_FAILURE = "[USER]_REMOVE_FAILURE";

export const removeUser = () => ({
  type: USER_REMOVE_REQUEST
});

export const removeUserSuccess = () => ({
  type: USER_REMOVE_SUCCESS
});

export const removeUserFailure = error => ({
  type: USER_REMOVE_FAILURE,
  error
});

export const USER_PROFILE_FETCH_REQUEST = "[USER]_PROFILE_FETCH_REQUEST";
export const USER_PROFILE_FETCH_SUCCESS = "[USER]_PROFILE_FETCH_SUCCESS";
export const USER_PROFILE_FETCH_FAILURE = "[USER]_PROFILE_FETCH_FAILURE";

export const fetchUserProfile = () => ({
  type: USER_PROFILE_FETCH_REQUEST
});

export const fetchUserProfileSuccess = user => ({
  type: USER_PROFILE_FETCH_SUCCESS,
  user
});

export const fetchUserProfileFailure = error => ({
  type: USER_PROFILE_FETCH_FAILURE,
  error
});
