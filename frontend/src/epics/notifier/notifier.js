import { toast } from "react-toastify";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGIN_FAILURE
} from "../../actions/users";

export const notificationsMapping = {
  [USER_LOGIN_SUCCESS]: {
    message: "You've logged in!",
    type: "success"
  },
  [USER_LOGOUT_SUCCESS]: {
    message: "You've logged in!",
    type: "success"
  },
  [USER_LOGIN_FAILURE]: {
    message: "Bad credentials.",
    type: "error"
  }
};

export const toastWrapper = type => {
  const notifySettings = notificationsMapping[type];
  const { type: notifyType, message } = notifySettings;
  toast[notifyType](message);
};
