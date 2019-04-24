import { combineReducers } from "redux";
import articles from "./articles/index";
import user from "./user/index";

export default combineReducers({
  articles,
  user
});
