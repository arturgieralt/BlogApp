import { map, mergeMap, withLatestFrom, catchError } from "rxjs/operators";
import { ofType, ActionsObservable } from "redux-observable";
import { ajax } from "rxjs/ajax";

import {
  AVATAR_UPLOAD_REQUEST,
  uploadAvatarSuccess,
  uploadAvatarFailure
} from "../actions/avatar";

export const uploadAvatarEpic = (action$, state$) =>
  action$.pipe(
    ofType(AVATAR_UPLOAD_REQUEST),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      ajax({
        url: "https://localhost:3001/avatar/upload",
        headers: {
          Authorization: `Bearer ${state.user.token}`
        },
        body: action.avatar,
        cache: false,
        method: "POST"
      }).pipe(
        map(() => uploadAvatarSuccess()),
        catchError(error => ActionsObservable.of(uploadAvatarFailure(error)))
      )
    )
  );
