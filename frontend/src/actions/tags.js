export const TAGS_FETCH_REQUEST = "[TAGS]_FETCH_REQUEST";
export const TAGS_FETCH_SUCCESS = "[TAGS]_FETCH_SUCCESS";
export const TAGS_FETCH_FAILURE = "[TAGS]_FETCH_FAILURE";

export const fetchTags = () => ({
  type: TAGS_FETCH_REQUEST
});

export const fetchTagsSuccess = tags => ({
  type: TAGS_FETCH_SUCCESS,
  tags
});

export const fetchTagsFailure = error => ({
  type: TAGS_FETCH_FAILURE,
  error
});
