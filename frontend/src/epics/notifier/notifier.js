import { toast } from "react-toastify";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGIN_FAILURE
} from "../../actions/users";
import {
  CAPTCHA_VERIFY_REQUEST,
  CAPTCHA_VERIFY_SUCCESS
} from "../../actions/captcha";

export const notificationsMapping = {
  [USER_LOGIN_SUCCESS]: () => ({
    message: "You've logged in!",
    type: "success"
  }),
  [USER_LOGOUT_SUCCESS]: () => ({
    message: "You've logged out!",
    type: "success"
  }),
  [USER_LOGIN_FAILURE]: () => ({
    message: "Bad credentials.",
    type: "error"
  }),
  [CAPTCHA_VERIFY_REQUEST]: () => ({
    message: "Checking if you are a human",
    type: "info"
  }),
  [CAPTCHA_VERIFY_SUCCESS]: action => ({
    message: action.isHuman ? "You're a human!" : "You're a robot!",
    type: action.isHuman ? "success" : "error"
  })
};

export const toastWrapper = action => {
  const notifySettings = notificationsMapping[action.type](action);
  const { type: notifyType, message } = notifySettings;
  toast[notifyType](message);
};
