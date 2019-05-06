import { ofType } from "redux-observable";
import { keys } from "ramda";
import { map } from "rxjs/operators";
import { toastWrapper, notificationsMapping } from "./notifier";

export const notifierEpic = action$ =>
  action$.pipe(
    ofType(...keys(notificationsMapping)),
    map(action => {
      toastWrapper(action.type);
      return {
        type: "NOTIFIED"
      };
    })
  );
