import { Request, Response, NextFunction } from 'express';
import * as userService from './../services/UserService';
import { baseController } from './BaseController';

const provideIdParam = (req: Request, res: Response, next: NextFunction) => [
  req.params.userId
];
const provideIdAndBodyParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => [req.params.userId, req.body];
const provideBody = (req: Request, res: Response, next: NextFunction) => [
  req.body
];

function _getAll() {
  return userService.getAll();
}

function _getSingle(userId: string) {
  return userService.getSingle(userId);
}

function _update(userId: string, body: any) {
  // validation here
  return userService.update(userId, body);
}

function _add(body: any) {
  return userService.add(body);
}

function _remove(userId: string) {
  return userService.remove(userId);
}

export const getAll = baseController(_getAll);
export const getSingle = baseController(_getSingle, provideIdParam);
export const update = baseController(_update, provideIdAndBodyParams);
export const add = baseController(_add, provideBody);
export const remove = baseController(_remove, provideIdParam);
