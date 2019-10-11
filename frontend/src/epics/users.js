/* eslint-disable import/prefer-default-export */

import { map, mergeMap, catchError, withLatestFrom } from "rxjs/operators";
import { push } from "connected-react-router";
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
  verifyUserFailure,
  loginUser,
  USER_LOGOUT_SUCCESS,
  USER_REMOVE_REQUEST,
  removeUserSuccess,
  removeUserFailure,
  fetchUserProfile,
  USER_LOGIN_SUCCESS,
  USER_PROFILE_FETCH_REQUEST,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  USER_EXTERNAL_PROVIDER_LOGIN_REQUEST
} from "../actions/users";

export const loginUserEpic = action$ =>
  action$.pipe(
    ofType(USER_LOGIN_REQUEST),
    mergeMap(action => {
      console.log(action);
      return ajax({
        url: "https://localhost:3001/user/login",
        withCredentials: "include",
        body: JSON.stringify({ ...action.user }),
        headers: {
          "Content-Type": "application/json"
        },
        cache: false,
        method: "POST"
      }).pipe(
        map(() => loginUserSuccess()),
        catchError(error => ActionsObservable.of(loginUserFailure(error)))
      );
    })
  );

export const loginUserWithExternalProviderEpic = action$ =>
  action$.pipe(
    ofType(USER_EXTERNAL_PROVIDER_LOGIN_REQUEST),
    mergeMap(action => {
      return ajax({
        url: `https://localhost:3001/user/login/${action.provider}`,
        body: JSON.stringify({ token: action.token }),
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
        withCredentials: true,
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

export const userLogoutSuccessEpic = action$ =>
  action$.pipe(
    ofType(USER_LOGOUT_SUCCESS),
    mergeMap(() => ActionsObservable.of(push("/")))
  );

export const userLoginSuccessEpic = action$ =>
  action$.pipe(
    ofType(USER_LOGIN_SUCCESS),
    mergeMap(() => [fetchUserProfile(), push("/")])
  );

export const verifyUserEpic = (action$, state$) =>
  action$.pipe(
    ofType(USER_VERIFY_REQUEST),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      ajax({
        url: "https://localhost:3001/user/verify",
        withCredentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`
        },
        body: JSON.stringify({ verifyToken: action.verifyToken }),
        cache: false,
        method: "POST"
      }).pipe(
        mergeMap(() => [verifyUserSuccess(), fetchUserProfile()]),
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
        mergeMap(() => [loginUser(action.user), registerUserSuccess()]),
        catchError(error => ActionsObservable.of(registerUserFailure(error)))
      );
    })
  );

export const removeUserEpic = (action$, state$) =>
  action$.pipe(
    ofType(USER_REMOVE_REQUEST),
    withLatestFrom(state$),
    mergeMap(([, state]) =>
      ajax({
        url: "https://localhost:3001/user/remove",
        withCredentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`
        },
        cache: false,
        method: "POST"
      }).pipe(
        mergeMap(() => [removeUserSuccess(), logoutUserSuccess()]),
        catchError(error => ActionsObservable.of(removeUserFailure(error)))
      )
    )
  );

export const fetchUserProfileEpic = action$ =>
  action$.pipe(
    ofType(USER_PROFILE_FETCH_REQUEST),
    mergeMap(() =>
      ajax({
        url: "https://localhost:3001/user/profile",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
          // Authorization: `Bearer ${state.user.token}`
        },
        cache: false,
        method: "GET"
      }).pipe(
        map(({ response }) => fetchUserProfileSuccess(response)),
        catchError(error =>
          ActionsObservable.of(fetchUserProfileFailure(error))
        )
      )
    )
  );
