import { combineEpics } from "redux-observable";
import {
  fetchArticlesEpic,
  addArticleEpic,
  fetchArticleEpic
} from "./articles";
import { loginUserEpic, registerUserEpic } from "./users";
import decodeTokenEpic from "./token";

export default combineEpics(
  fetchArticlesEpic,
  addArticleEpic,
  loginUserEpic,
  decodeTokenEpic,
  registerUserEpic,
  fetchArticleEpic
);
