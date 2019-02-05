import { Request, Response, NextFunction } from 'express';
import * as commentService from './../services/CommentService';
import { baseController } from './BaseController';

const provideIdParam = (req: Request, res: Response, next: NextFunction) => [
  req.params.commentId
];
const provideIdAndBodyParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => [req.params.commentId, req.body];
const provideBody = (req: Request, res: Response, next: NextFunction) => [
  req.body
];

function _getAll() {
  return commentService.getAll();
}

function _getSingle(commentId: string) {
  return commentService.getSingle(commentId);
}

function _update(commentId: string, body: any) {
  // validation here
  return commentService.update(commentId, body);
}

function _add(body: any) {
  return commentService.add(body);
}

function _remove(commentId: string) {
  return commentService.remove(commentId);
}

export const getAll = baseController(_getAll);
export const getSingle = baseController(_getSingle, provideIdParam);
export const update = baseController(_update, provideIdAndBodyParams);
export const add = baseController(_add, provideBody);
export const remove = baseController(_remove, provideIdParam);
