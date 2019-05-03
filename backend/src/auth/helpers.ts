import bcrypt from 'bcrypt';
import { getSingleByName } from './../services/UserService';
import { VerifiedCallback } from 'passport-jwt';
import { IVerifyOptions } from 'passport-local';

export const verifyUser = async (
  name: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions) => void
) => {
  try {
    const user = await getSingleByName(name);
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

export const validateToken = (payload: any, done: VerifiedCallback) => {
  const hasTokenExpired = Date.now() > payload.expires;
  return hasTokenExpired ? done('jwt expired') : done(null, payload);
};


  

