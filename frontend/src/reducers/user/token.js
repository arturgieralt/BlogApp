import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS
} from "../../actions/users";

export default function token(state = null, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_LOGIN_FAILURE:
      return null;
    case USER_LOGIN_SUCCESS:
      return action.token;
    default:
      return state;
  }
}
