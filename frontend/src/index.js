import React from "react";
import { render, hydrate } from "react-dom";

import "./index.css";
import Root from "./views/Root";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store/configure";

const store = configureStore();

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<Root store={store} />, rootElement);
} else {
  render(<Root store={store} />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
