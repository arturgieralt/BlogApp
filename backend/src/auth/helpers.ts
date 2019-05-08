import bcrypt from 'bcrypt';
import UserService from './../services/UserService';
import { VerifiedCallback } from 'passport-jwt';
import { IVerifyOptions } from 'passport-local';
import { IAuthToken } from 'services/TokenService/IAuthToken';
import { IUserModel } from 'models/IUserModel';

export const verifyUser = async (
  name: string,
  password: string,
  done: (error: any, user?: IUserModel | boolean, options?: IVerifyOptions) => void
) => {
  try {
    const user = await UserService.getSingleByName(name);
    if (user) {
      const storedPass = user.passwordHash;
      const doesPasswordMatch = await bcrypt.compare(password, storedPass);

      if (doesPasswordMatch) {
        return done(null, user);
      }
    }

    return done(null, false, { message: 'Incorect username or password' });
  } catch (error) {
    return done(error);
  }
};

export const validateToken = (payload: IAuthToken, done: VerifiedCallback) => {
  const hasTokenExpired = Date.now() > payload.exp;
  return hasTokenExpired ? done('jwt expired') : done(null, payload);
};


  

