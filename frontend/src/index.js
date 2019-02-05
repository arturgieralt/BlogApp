import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Root from './views/Root';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './store/configure';
import { BrowserRouter as Router} from "react-router-dom";
import { fetchArticles } from './actions/articles';

const store = configureStore();
store.dispatch(fetchArticles());
render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
