import { combineReducers } from "redux";
import claims from "./claims";
import token from "./token";
import info from "./info";

export default combineReducers({
  claims,
  token,
  info
});
