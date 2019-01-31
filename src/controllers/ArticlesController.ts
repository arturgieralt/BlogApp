import {
  getAllArticles as getAllArticlesService,
  getSingleArticle as getSingleArticleService,
  updateArticle,
  addArticle,
  deleteArticle as deleteArticleService
} from './../services/ArticleService';
import { baseController } from './BaseController';
import { Request, Response, NextFunction } from 'express';

const provideArticleIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => [req.params.articleId];
const provideArticleIdAndBodyParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => [req.params.articleId, req.body];
const provideBody = (req: Request, res: Response, next: NextFunction) => [
  req.body
];

function getAll() {
  return getAllArticlesService();
}

function getSingle(articleId: string) {
  return getSingleArticleService(articleId);
}

function update(articleId: string, body: any) {
  return updateArticle(articleId, body);
}

function add(body: any) {
  return addArticle(body);
}

function deleteArticle(articleId: string) {
  return deleteArticleService(articleId);
}

export const getAllArticles = baseController(getAll);
export const getSingleArticle = baseController(
  getSingle,
  provideArticleIdParam
);
export const updateSingleArticle = baseController(
  update,
  provideArticleIdAndBodyParams
);
export const addSingleArticle = baseController(add, provideBody);
export const deleteSingleArticle = baseController(
  deleteArticle,
  provideArticleIdParam
);
