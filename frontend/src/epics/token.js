import JwtDecode from "jwt-decode";
import { ActionsObservable, ofType } from "redux-observable";
import { mergeMap, catchError } from "rxjs/operators";
import { USER_LOGIN_SUCCESS } from "../actions/users";
import { decodeTokenSuccess, decodeTokenFailure } from "../actions/token";

const decodeTokenEpic = action$ =>
  action$.pipe(
    ofType(USER_LOGIN_SUCCESS),
    mergeMap(action => {
      const decodedToken = JwtDecode(action.token);
      return ActionsObservable.of(decodeTokenSuccess(decodedToken));
    }),
    catchError(error => ActionsObservable.of(decodeTokenFailure(error)))
  );

export default decodeTokenEpic;
