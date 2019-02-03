import { Request, Response, NextFunction } from 'express';
import * as userService from './../services/UserService';
import { baseController } from './BaseController';
import bcrypt from 'bcrypt';
import passport = require('passport');
import { Document } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { IVerifyOptions } from 'passport-local';

const provideAll = (req: Request, res: Response, next: NextFunction) => [
  req,
  res
];

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

async function _register(body: any) {
  const rounds: number = Number(process.env.PASS_ROUNDS);
  const { name, password, email } = body;
  const passwordHash = await bcrypt.hash(password, rounds);
  return userService.add(name, passwordHash, email);
}

export function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'local',
    { session: false },
    (error: any, user: Document, options?: IVerifyOptions) => {
      if (error || !user) {
        res.status(400).json({ ...error, ...options });
      }

      const expiryTime = Number(process.env.JWT_EXP_TIME_MS);
      const secret = process.env.SECRET_JWT;
      const payload = {
        username: user.toObject().name,
        expires: Date.now() + expiryTime
      };

      req.login(payload, { session: false }, error => {
        if (error) {
          res.status(400).json({ error });
        }
        const token = jwt.sign(JSON.stringify(payload), secret as string);
        res.status(200).send({ token });
      });
    }
  )(req, res, next);
}

function _remove(userId: string) {
  return userService.remove(userId);
}

export const getAll = baseController(_getAll);
export const getSingle = baseController(_getSingle, provideIdParam);
export const update = baseController(_update, provideIdAndBodyParams);
export const register = baseController(_register, provideBody);
export const remove = baseController(_remove, provideIdParam);
