import { ofType, ActionsObservable } from "redux-observable";
import { map, mergeMap, withLatestFrom, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

import {
  ARTICLES_FETCH_REQUEST,
  fetchArticlesSuccess,
  ARTICLE_ADD_REQUEST,
  addArticleSuccess,
  addArticleFailure,
  fetchArticlesFailure,
  ARTICLE_FETCH_REQUEST,
  fetchArticleSuccess,
  fetchArticleFailure
} from "../actions/articles";

export const fetchArticlesEpic = action$ =>
  action$.pipe(
    ofType(ARTICLES_FETCH_REQUEST),
    mergeMap(() =>
      ajax.getJSON("https://localhost:3001/articles").pipe(
        map(response => fetchArticlesSuccess(response)),
        catchError(error => ActionsObservable.of(fetchArticlesFailure(error)))
      )
    )
  );

export const fetchArticleEpic = action$ =>
  action$.pipe(
    ofType(ARTICLE_FETCH_REQUEST),
    mergeMap(action =>
      ajax.getJSON(`https://localhost:3001/articles/${action.id}`).pipe(
        map(response => fetchArticleSuccess(response)),
        catchError(error => ActionsObservable.of(fetchArticleFailure(error)))
      )
    )
  );

export const addArticleEpic = (action$, state$) =>
  action$.pipe(
    ofType(ARTICLE_ADD_REQUEST),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      ajax({
        url: "https://localhost:3001/articles/add",
        body: JSON.stringify({ ...action.article }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`
        },
        cache: false,
        method: "POST"
      }).pipe(
        map(response => addArticleSuccess(response)),
        catchError(error => ActionsObservable.of(addArticleFailure(error)))
      )
    )
  );
