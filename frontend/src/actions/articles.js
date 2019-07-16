export const ARTICLES_FETCH_REQUEST = "[ARTICLES]_FETCH_REQUEST";
export const ARTICLES_FETCH_SUCCESS = "[ARTICLES]_FETCH_SUCCESS";
export const ARTICLES_FETCH_FAILURE = "[ARTICLES]_FETCH_FAILURE";

export const fetchArticles = () => ({
  type: ARTICLES_FETCH_REQUEST
});

export const fetchArticlesSuccess = articles => ({
  type: ARTICLES_FETCH_SUCCESS,
  articles
});

export const fetchArticlesFailure = error => ({
  type: ARTICLES_FETCH_FAILURE,
  error
});

export const ARTICLE_FETCH_REQUEST = "[ARTICLE]_FETCH_REQUEST";
export const ARTICLE_FETCH_SUCCESS = "[ARTICLE]_FETCH_SUCCESS";
export const ARTICLE_FETCH_FAILURE = "[ARTICLE]_FETCH_FAILURE";

export const fetchArticle = id => ({
  type: ARTICLE_FETCH_REQUEST,
  id
});

export const fetchArticleSuccess = article => ({
  type: ARTICLE_FETCH_SUCCESS,
  article
});

export const fetchArticleFailure = error => ({
  type: ARTICLE_FETCH_FAILURE,
  error
});

export const ARTICLE_ADD_REQUEST = "[ARTICLE]_ADD_REQUEST";
export const ARTICLE_ADD_SUCCESS = "[ARTICLE]_ADD_SUCCESS";
export const ARTICLE_ADD_FAILURE = "[ARTICLE]_ADD_FAILURE";

export const addArticle = article => ({
  type: ARTICLE_ADD_REQUEST,
  article
});

export const addArticleSuccess = articleCreated => ({
  type: ARTICLE_ADD_SUCCESS,
  articleCreated
});

export const addArticleFailure = error => ({
  type: ARTICLE_ADD_FAILURE,
  error
});

export const ARTICLES_QUERY_REQUEST = "[ARTICLES]_QUERY_REQUEST";

export const queryArticles = queryObject => ({
  type: ARTICLES_QUERY_REQUEST,
  queryObject
});
