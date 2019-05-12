import { toast } from "react-toastify";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGIN_FAILURE
} from "../../actions/users";
import {
  CAPTCHA_VERIFY_REQUEST,
  CAPTCHA_VERIFY_SUCCESS,
  CAPTCHA_VERIFY_FAILURE
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
    message: "reCaptcha is checking if you're a human...",
    type: "info"
  }),
  [CAPTCHA_VERIFY_SUCCESS]: action => ({
    message: action.isHuman
      ? "You're a human! You can fill in the form."
      : "You're a robot!",
    type: action.isHuman ? "success" : "error"
  }),
  [CAPTCHA_VERIFY_FAILURE]: () => ({
    message: "Cannot check if you're a human. The form is blocked.",
    type: "error"
  })
};

export const toastWrapper = action => {
  const notifySettings = notificationsMapping[action.type](action);
  const { type: notifyType, message } = notifySettings;
  toast[notifyType](message);
};
