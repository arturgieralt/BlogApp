import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_VERIFY_SUCCESS
} from "../../actions/users";
import { TOKEN_CLEAN, TOKEN_DECODE_FAILURE } from "../../actions/token";

export default function token(state = null, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_LOGIN_FAILURE:
    case TOKEN_DECODE_FAILURE:
    case TOKEN_CLEAN:
      return null;
    case USER_LOGIN_SUCCESS:
    case USER_VERIFY_SUCCESS:
      return action.token;
    default:
      return state;
  }
}
