import { createStore } from "redux";
import { rootReducer } from "../reducers/rootReducer";

export const configureStore = (predefinedState) => {
    const store = createStore(
        rootReducer,
        predefinedState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    return store;
}