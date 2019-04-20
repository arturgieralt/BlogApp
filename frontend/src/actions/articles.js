export const ARTICLES_FETCH_REQUEST = "[ARTICLES]_FETCH_REQUEST";
export const ARTICLES_FETCH_SUCCESS = "[ARTICLES]_FETCH_SUCCESS";
export const ARTICLES_FETCH_FAILURE = "[ARTICLES]_FETCH_FAILURE";

export const fetchArticles = () => ({
  type: ARTICLES_FETCH_REQUEST
});

export const fetchArticlesSuccess = articles => ({
  type: ARTICLES_FETCH_SUCCESS,
  payload: articles
});

export const ARTICLE_ADD_REQUEST = "[ARTICLE]_ADD_REQUEST";
export const ARTICLE_ADD_SUCCESS = "[ARTICLE]_ADD_SUCCESS";
export const ARTICLE_ADD_FAILURE = "[ARTICLE]_ADD_FAILURE";

export const addArticle = articleToAdd => ({
  type: ARTICLE_ADD_REQUEST,
  payload: articleToAdd
});

export const addArticleSuccess = articleCreated => ({
  type: ARTICLE_ADD_SUCCESS,
  payload: articleCreated
});
