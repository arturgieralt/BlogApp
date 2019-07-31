import { combineEpics } from "redux-observable";
import {
  fetchArticlesEpic,
  addArticleEpic,
  fetchArticleEpic,
  queryArticlesEpic
} from "./articles";
import {
  loginUserEpic,
  registerUserEpic,
  logoutUserEpic,
  verifyUserEpic,
  userLogoutSuccessEpic,
  removeUserEpic,
  userLoginSuccessEpic,
  fetchUserProfileEpic,
  loginUserWithExternalProviderEpic
} from "./users";
import {
  decodeTokenEpic,
  decodeTokenSuccessEpic,
  cleanTokenEpic
} from "./token";
import { uploadAvatarEpic } from "./avatar";
import { notifierEpic } from "./notifier/notifierEpic";
import { verifyCaptchaEpic } from "./captcha";
import { fetchTagsEpic } from "./tags";

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
  userLogoutSuccessEpic,
  removeUserEpic,
  uploadAvatarEpic,
  userLoginSuccessEpic,
  fetchUserProfileEpic,
  notifierEpic,
  verifyCaptchaEpic,
  fetchTagsEpic,
  queryArticlesEpic,
  loginUserWithExternalProviderEpic
);
