import {
  ARTICLE_FETCH_SUCCESS,
  ARTICLE_FETCH_FAILURE
} from "../../actions/articles";

export default function articlesFull(state = [], action) {
  switch (action.type) {
    case ARTICLE_FETCH_SUCCESS:
      return {
        ...state,
        [action.article._id]: { ...action.article }
      };
    case ARTICLE_FETCH_FAILURE:
      return state;
    default:
      return state;
  }
}
