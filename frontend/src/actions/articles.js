export const ARTICLES_FETCH_REQUEST = '[ARTICLES]_FETCH_REQUEST';
export const ARTICLES_FETCH_SUCCESS = '[ARTICLES]_FETCH_SUCCESS';
export const ARTICLES_FETCH_FAILURE = '[ARTICLES]_FETCH_FAILURE';

export const fetchArticles = () => ({
    type: ARTICLES_FETCH_REQUEST
});

export const fetchArticlesSuccess = (articles) => ({
    type: ARTICLES_FETCH_SUCCESS,
    payload: articles
});
