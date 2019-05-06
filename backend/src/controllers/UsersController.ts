import { Request, Response, NextFunction } from 'express';
import * as userService from './../services/UserService';
import { baseController } from './BaseController';
import MailService from './../mailer/MailService';
import { welcomeMail, accountActivated, accountRemoved } from './../mailer/templates';
import { getRolesPerUser } from './../services/RolesService';
import TokenServiceInstance from './../services/TokenService/TokenService';
import { IUserModel, IUserDto } from 'models/IUserModel';
import { IVerifyToken } from 'services/TokenService/IVerifyToken';
import { VerifyAccount } from './../services/TokenService/TokenFactory';
import { IAuthToken } from 'services/TokenService/IAuthToken';

const provideIdParam = (req: Request, res: Response, next: NextFunction) => [
  req.params.userId
];
const provideIdAndBodyParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => [req.params.userId, req.body];
const provideAll = (req: Request, res: Response, next: NextFunction) => [
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


export async function getMyProfile(req: Request, res: Response, next: NextFunction) {

  try {
    const { user }: {user?: IAuthToken} = req;
    const userData = await userService.getUserProfile(user!.id)
    res.status(200).send(userData);
  } catch (e) {
    res.status(400).send({...e});
  }


}

export async function register(req: Request, res: Response, next: NextFunction) {
  const { name, password, email } = req.body;  
  try {
    const user = await userService.add(name, password, email);
    const token = await TokenServiceInstance.createVerificationToken(user._id);
    MailService.sendMail(welcomeMail(user, token));
    res.status(200).send();
  } catch (e) {
    res.status(400).send({...e});
  }

}

export async function verify(req: Request, res: Response, next: NextFunction) {
  const { verifyToken: token } = req.body;

  try{
    const decoded: IVerifyToken = await TokenServiceInstance
      .verifyToken(token, VerifyAccount);
    const user: IUserModel = await userService.verify(decoded.id);
    await TokenServiceInstance.blacklist(decoded.tokenId)
    MailService.sendMail(accountActivated(user));
    res.status(200).send();
  } catch(e) {
    res.status(400).send(e);
  }

}

export async function login(req: Request, res: Response, next: NextFunction) {

  try{
    const user: IUserModel = await userService.authenticate(req, res, next);
    const roles = await getRolesPerUser(user.id);
    const { token, payload} = await TokenServiceInstance.createToken(user, roles);
    const loginSuccess = await userService.login(req, payload)

      if(loginSuccess) {

        res.status(200).send({ token })
      } else {

        TokenServiceInstance.blacklist(payload.tokenId)
        res.status(401).send({message: 'Cannot log in'})
      }
    } catch(e) {

      res.status(400).json({ e });
    }
}

function _logout (req: Request, res: Response){
  try {
    const { user }: {user?: IAuthToken} = req;
    TokenServiceInstance.blacklist(user!.tokenId)
    req.logout();
    return Promise.resolve();
  }  catch(e) {
    return Promise.resolve(e);
  }
  
}

export async function remove(req: Request, res: Response, next: NextFunction) {

    try{

      const { user }: {user?: IAuthToken} = req;
      await TokenServiceInstance.blacklistAllForUser(user!.id);
      await userService.remove(user!.id);
      MailService.sendMail(accountRemoved(user));
      req.logout();
      res.status(200).send();  
    }
    catch(e) {

      res.status(400).send(e);
    }
}

export const logout = baseController(_logout, provideAll);
export const getAll = baseController(_getAll);
export const getSingle = baseController(_getSingle, provideIdParam);
export const update = baseController(_update, provideIdAndBodyParams);
