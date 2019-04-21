import { combineEpics } from "redux-observable";
import { fetchArticlesEpic, addArticleEpic } from "./articles";
import { loginUserEpic } from "./users";

export default combineEpics(fetchArticlesEpic, addArticleEpic, loginUserEpic);
