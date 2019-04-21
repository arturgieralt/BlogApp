import { Request, Response, NextFunction } from 'express';
import * as userService from './../services/UserService';
import { baseController } from './BaseController';
import bcrypt from 'bcrypt';
import passport = require('passport');
import { Document } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { IVerifyOptions } from 'passport-local';
import { getRolesPerUser } from './../services/RolesService';
import { getRoleNames, getExpiryTime, getSecret, createTokenPayload } from './../auth/helpers';

const provideIdParam = (req: Request, res: Response, next: NextFunction) => [
  req.params.userId
];
const provideIdAndBodyParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => [req.params.userId, req.body];
const provideBody = (req: Request, res: Response, next: NextFunction) => [
  req, res, next
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

export async function register(req: Request, res: Response, next: NextFunction) {
  const rounds: number = Number(process.env.PASS_ROUNDS);
  const { name, password, email } = req.body;
  
  try {
    const passwordHash = await bcrypt.hash(password, rounds);
    const user = await userService.add(name, passwordHash, email)
    login(req, res, next)
  } catch (e) {
    res.status(400).send({...e})
  }

}

export function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    'local',
    { session: false },
    async (error: any, user: Document, options?: IVerifyOptions) => {
      if (error || !user) {
        res.status(400).json({ ...error, ...options });
      }

      const rolesDocs = await getRolesPerUser(user.id);
      const userRoles = getRoleNames(rolesDocs);
      const expTime =  Date.now() + (getExpiryTime() as number);
      const secret = getSecret();
      const payload = createTokenPayload(user, userRoles, expTime);

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
export const remove = baseController(_remove, provideIdParam);
