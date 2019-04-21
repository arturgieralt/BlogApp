/* eslint-disable import/prefer-default-export */

import { map, mergeMap, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { ofType, ActionsObservable } from "redux-observable";
import {
  USER_LOGIN_REQUEST,
  loginUserSuccess,
  loginUserFailure,
  USER_REGISTER_REQUEST,
  registerUserFailure,
  registerUserSuccess
} from "../actions/users";

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
      }).pipe(
        map(({ response }) => loginUserSuccess(response.token)),
        catchError(error => ActionsObservable.of(loginUserFailure(error)))
      );
    })
  );

export const registerUserEpic = action$ =>
  action$.pipe(
    ofType(USER_REGISTER_REQUEST),
    mergeMap(action => {
      return ajax({
        url: "https://localhost:3001/user/register",
        body: JSON.stringify({ ...action.user }),
        headers: {
          "Content-Type": "application/json"
        },
        cache: false,
        method: "POST"
      }).pipe(
        mergeMap(({ response }) => [
          loginUserSuccess(response.token),
          registerUserSuccess(response.token)
        ]),
        catchError(error => ActionsObservable.of(registerUserFailure(error)))
      );
    })
  );
