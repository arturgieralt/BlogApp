import {
  ARTICLES_FETCH_REQUEST,
  fetchArticlesSuccess,
  ARTICLE_ADD_REQUEST,
  addArticleSuccess
} from '../actions/articles';
import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export const fetchArticlesEpic = action$ =>
  action$.pipe(
    ofType(ARTICLES_FETCH_REQUEST),
    mergeMap(action =>
      ajax
        .getJSON('https://localhost:3001/articles')
        .pipe(map(response => fetchArticlesSuccess(response)))
    )
  );

export const addArticleEpic = action$ =>
  action$.pipe(
    ofType(ARTICLE_ADD_REQUEST),
    mergeMap(action =>
      ajax
        .post('https://localhost:3001/articles', { ...action.payload })
        .pipe(map(response => addArticleSuccess(response)))
    )
  );
