import { map, catchError, mergeMap } from "rxjs/operators";
import { ofType, ActionsObservable } from "redux-observable";
import { ajax } from "rxjs/ajax";

import {
  CAPTCHA_VERIFY_REQUEST,
  verifyCaptchaSuccess,
  verifyCaptchaFailure
} from "../actions/captcha";

export const verifyCaptchaEpic = action$ =>
  action$.pipe(
    ofType(CAPTCHA_VERIFY_REQUEST),
    mergeMap(action =>
      ajax({
        url: "https://localhost:3001/captcha/verify",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: action.token }),
        cache: false,
        method: "POST"
      }).pipe(
        map(({ response }) => verifyCaptchaSuccess(response)),
        catchError(error => ActionsObservable.of(verifyCaptchaFailure(error)))
      )
    )
  );
