import { TAGS_FETCH_SUCCESS } from "../../actions/tags";

export default function tags(state = [], action) {
  switch (action.type) {
    case TAGS_FETCH_SUCCESS:
      return action.tags;
    default:
      return state;
  }
}
