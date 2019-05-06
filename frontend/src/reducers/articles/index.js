import { combineReducers } from "redux";
import summary from "./summary";
import full from "./full";

export default combineReducers({
  summary,
  full
});
