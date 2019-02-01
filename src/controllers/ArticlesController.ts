import * as articleService from './../services/ArticleService';
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

function _getAll() {
  return articleService.getAll();
}

function _getSingle(articleId: string) {
  return articleService.getSingle(articleId);
}

function _update(articleId: string, body: any) {
  // validation here
  return articleService.update(articleId, body);
}

function _add(body: any) {
  return articleService.add(body);
}

function _remove(articleId: string) {
  return articleService.remove(articleId);
}

export const getAll = baseController(_getAll);
export const getSingle = baseController(_getSingle, provideArticleIdParam);
export const update = baseController(_update, provideArticleIdAndBodyParams);
export const add = baseController(_add, provideBody);
export const remove = baseController(_remove, provideArticleIdParam);
