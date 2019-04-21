import { combineReducers } from "redux";
import claims from "./claims";
import token from "./token";

export default combineReducers({
  claims,
  token
});
