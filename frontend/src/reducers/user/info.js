import {
  USER_PROFILE_FETCH_FAILURE,
  USER_PROFILE_FETCH_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_SUCCESS
} from "../../actions/users";
import { TOKEN_DECODE_FAILURE, TOKEN_CLEAN } from "../../actions/token";

export default function info(state = {}, action) {
  switch (action.type) {
    case TOKEN_DECODE_FAILURE:
    case USER_LOGIN_FAILURE:
    case TOKEN_CLEAN:
    case USER_LOGOUT_SUCCESS:
    case USER_PROFILE_FETCH_FAILURE:
      return {};
    case USER_PROFILE_FETCH_SUCCESS:
      return { ...action.user };
    default:
      return state;
  }
}
