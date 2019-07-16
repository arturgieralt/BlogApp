import { ofType, ActionsObservable } from "redux-observable";
import { map, mergeMap, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import {
  TAGS_FETCH_REQUEST,
  fetchTagsSuccess,
  fetchTagsFailure
} from "../actions/tags";

export const fetchTagsEpic = action$ =>
  action$.pipe(
    ofType(TAGS_FETCH_REQUEST),
    mergeMap(() =>
      ajax.getJSON(`https://localhost:3001/tags`).pipe(
        map(response => fetchTagsSuccess(response)),
        catchError(error => ActionsObservable.of(fetchTagsFailure(error)))
      )
    )
  );
