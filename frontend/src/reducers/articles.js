import { ARTICLES_FETCH_SUCCESS, ARTICLES_FETCH_FAILURE } from '../actions/articles';

export function articles(state = [], action) {
  switch (action.type) {
    case ARTICLES_FETCH_SUCCESS:
      return [...action.payload];
    case ARTICLES_FETCH_FAILURE:
      return state;
    default:
      return state;
  }
}
