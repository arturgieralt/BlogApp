import { combineEpics } from "redux-observable";
import { fetchArticlesEpic, addArticleEpic } from "./articles";

export default combineEpics(fetchArticlesEpic, addArticleEpic);
