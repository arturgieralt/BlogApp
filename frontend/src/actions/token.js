export const TOKEN_DECODE_REQUEST = "[TOKEN]_DECODE_REQUEST";
export const TOKEN_DECODE_SUCCESS = "[TOKEN]_DECODE_SUCCESS";
export const TOKEN_DECODE_FAILURE = "[TOKEN]_DECODE_FAILURE";

export const decodeToken = token => ({
  type: TOKEN_DECODE_REQUEST,
  token
});

export const decodeTokenSuccess = decodedToken => ({
  type: TOKEN_DECODE_SUCCESS,
  decodedToken
});

export const decodeTokenFailure = error => ({
  type: TOKEN_DECODE_FAILURE,
  error
});
