import {
  TOKEN_DECODE_REQUEST,
  TOKEN_DECODE_FAILURE,
  TOKEN_DECODE_SUCCESS
} from "../../actions/token";
import { USER_LOGIN_FAILURE } from "../../actions/users";

export default function claims(state = {}, action) {
  switch (action.type) {
    case TOKEN_DECODE_REQUEST:
    case TOKEN_DECODE_FAILURE:
    case USER_LOGIN_FAILURE:
      return {};
    case TOKEN_DECODE_SUCCESS:
      return { ...action.decodedToken };
    default:
      return state;
  }
}