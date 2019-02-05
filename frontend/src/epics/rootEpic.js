import { combineEpics } from 'redux-observable';
import { fetchArticlesEpic, addArticleEpic } from './articles';

export const rootEpic = combineEpics(
    fetchArticlesEpic,
    addArticleEpic
  );
  