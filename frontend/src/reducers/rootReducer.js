import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import articles from "./articles/index";
import user from "./user/index";
import tags from "./tags";
import loaders from "./loaders";

export default history =>
  combineReducers({
    router: connectRouter(history),
    articles,
    user,
    tags,
    loaders
  });
