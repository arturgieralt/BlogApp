import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import articles from "./articles/index";
import user from "./user/index";

export default history =>
  combineReducers({
    router: connectRouter(history),
    articles,
    user
  });
