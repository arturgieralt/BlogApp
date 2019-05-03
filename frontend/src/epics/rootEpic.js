import { combineEpics } from "redux-observable";
import {
  fetchArticlesEpic,
  addArticleEpic,
  fetchArticleEpic
} from "./articles";
import {
  loginUserEpic,
  registerUserEpic,
  logoutUserEpic,
  verifyUserEpic,
  userLogoutSuccessEpic
} from "./users";
import {
  decodeTokenEpic,
  decodeTokenSuccessEpic,
  cleanTokenEpic
} from "./token";

export default combineEpics(
  fetchArticlesEpic,
  addArticleEpic,
  loginUserEpic,
  decodeTokenEpic,
  decodeTokenSuccessEpic,
  registerUserEpic,
  fetchArticleEpic,
  logoutUserEpic,
  cleanTokenEpic,
  verifyUserEpic,
  userLogoutSuccessEpic
);
