import {
  CAPTCHA_VERIFY_SUCCESS,
  CAPTCHA_VERIFY_FAILURE
} from "../../actions/captcha";

export default function isHuman(state = false, action) {
  switch (action.type) {
    case CAPTCHA_VERIFY_SUCCESS:
      return action.isHuman;
    case CAPTCHA_VERIFY_FAILURE:
      return false;
    default:
      return state;
  }
}
