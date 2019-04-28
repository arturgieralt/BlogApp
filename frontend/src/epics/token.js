import JwtDecode from "jwt-decode";
import { ActionsObservable, ofType } from "redux-observable";
import { push } from "connected-react-router";
import { mergeMap, catchError } from "rxjs/operators";
import { USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from "../actions/users";
import {
  decodeTokenSuccess,
  decodeTokenFailure,
  TOKEN_DECODE_SUCCESS,
  cleanToken
} from "../actions/token";

export const decodeTokenEpic = action$ =>
  action$.pipe(
    ofType(USER_LOGIN_SUCCESS),
    mergeMap(action => {
      const decodedToken = JwtDecode(action.token);
      return ActionsObservable.of(decodeTokenSuccess(decodedToken));
    }),
    catchError(error => ActionsObservable.of(decodeTokenFailure(error)))
  );

export default decodeTokenEpic;

export const decodeTokenSuccessEpic = action$ =>
  action$.pipe(
    ofType(TOKEN_DECODE_SUCCESS),
    mergeMap(() => ActionsObservable.of(push("/")))
  );

export const cleanTokenEpic = action$ =>
  action$.pipe(
    ofType(USER_LOGOUT_SUCCESS),
    mergeMap(() => ActionsObservable.of(cleanToken("/")))
  );
