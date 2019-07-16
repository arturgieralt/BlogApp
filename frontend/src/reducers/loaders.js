import {
  ARTICLES_FETCH_REQUEST,
  ARTICLES_QUERY_REQUEST,
  ARTICLES_FETCH_FAILURE,
  ARTICLES_FETCH_SUCCESS
} from "../actions/articles";

export default function loaders(
  state = {
    articles: false
  },
  action
) {
  switch (action.type) {
    case ARTICLES_FETCH_REQUEST:
    case ARTICLES_QUERY_REQUEST:
      return {
        ...state,
        articles: true
      };
    case ARTICLES_FETCH_FAILURE:
    case ARTICLES_FETCH_SUCCESS:
      return {
        ...state,
        articles: false
      };
    default:
      return state;
  }
}
