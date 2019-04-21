/* eslint-disable import/prefer-default-export */

import { map, mergeMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { USER_LOGIN_REQUEST, loginUserSuccess } from "../actions/users";

export const loginUserEpic = action$ =>
  action$.pipe(
    ofType(USER_LOGIN_REQUEST),
    mergeMap(action => {
      console.log(action);
      return ajax({
        url: "https://localhost:3001/user/login",
        body: JSON.stringify({ ...action.user }),
        headers: {
          "Content-Type": "application/json"
        },
        cache: false,
        method: "POST"
      }).pipe(map(response => loginUserSuccess(response)));
    })
  );
