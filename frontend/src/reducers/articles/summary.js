import {
  ARTICLES_FETCH_SUCCESS,
  ARTICLES_FETCH_FAILURE
} from "../../actions/articles";

export default function articlesSummary(state = [], action) {
  switch (action.type) {
    case ARTICLES_FETCH_SUCCESS:
      return [...action.articles];
    case ARTICLES_FETCH_FAILURE:
      return state;
    default:
      return state;
  }
}
