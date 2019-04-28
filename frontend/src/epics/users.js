/* eslint-disable import/prefer-default-export */

import { map, mergeMap, catchError, withLatestFrom } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { ofType, ActionsObservable } from "redux-observable";
import {
  USER_LOGIN_REQUEST,
  loginUserSuccess,
  loginUserFailure,
  USER_REGISTER_REQUEST,
  registerUserFailure,
  registerUserSuccess,
  USER_LOGOUT_REQUEST,
  logoutUserSuccess,
  logoutUserFailure,
  USER_VERIFY_REQUEST,
  verifyUserSuccess,
  verifyUserFailure
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

export const logoutUserEpic = (action$, state$) =>
  action$.pipe(
    ofType(USER_LOGOUT_REQUEST),
    withLatestFrom(state$),
    mergeMap(([, state]) =>
      ajax({
        url: "https://localhost:3001/user/logout",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`
        },
        cache: false,
        method: "POST"
      }).pipe(
        map(() => logoutUserSuccess()),
        catchError(error => ActionsObservable.of(logoutUserFailure(error)))
      )
    )
  );

export const verifyUserEpic = (action$, state$) =>
  action$.pipe(
    ofType(USER_VERIFY_REQUEST),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      ajax({
        url: "https://localhost:3001/user/verify",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`
        },
        body: JSON.stringify({ verifyToken: action.verifyToken }),
        cache: false,
        method: "POST"
      }).pipe(
        map(token => verifyUserSuccess(token)),
        catchError(error => ActionsObservable.of(verifyUserFailure(error)))
      )
    )
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
