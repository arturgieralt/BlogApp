import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "../reducers/rootReducer";
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './../epics/rootEpic';

export const configureStore = (predefinedState) => {

    const epicMiddleware = createEpicMiddleware();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        rootReducer,
        predefinedState,
        composeEnhancers(
            applyMiddleware(epicMiddleware)
          )
    );

    epicMiddleware.run(rootEpic);

    return store;
}