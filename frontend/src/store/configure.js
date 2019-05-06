import { createStore, compose, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import { createEpicMiddleware } from "redux-observable";
import { createBrowserHistory } from "history";
import rootReducer from "../reducers/rootReducer";
import rootEpic from "../epics/rootEpic";

export const history = createBrowserHistory();

export default function configureStore(predefinedState) {
  const epicMiddleware = createEpicMiddleware();
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer(history),
    predefinedState,
    composeEnhancers(applyMiddleware(epicMiddleware, routerMiddleware(history)))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
