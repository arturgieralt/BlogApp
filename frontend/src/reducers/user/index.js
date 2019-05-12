import { combineReducers } from "redux";
import claims from "./claims";
import token from "./token";
import info from "./info";
import isHuman from "./isHuman";

export default combineReducers({
  claims,
  token,
  info,
  isHuman
});
