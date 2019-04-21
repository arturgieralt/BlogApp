import bcrypt from 'bcrypt';
import { getSingleByName } from './../services/UserService';
import { VerifiedCallback } from 'passport-jwt';
import { IVerifyOptions } from 'passport-local';
import { Document } from 'mongoose';

export const verifyUser = async (
  name: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions) => void
) => {
  try {
    const user = await getSingleByName(name);

    if (user) {
      const storedPass = user.toObject().passwordHash;
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

export const getRoleNames = (rolesDocs: Document[] | null): string[] => rolesDocs === null
  ? []
  : rolesDocs.map((roleDoc: Document) => roleDoc.toObject().roleName);


export const createTokenPayload = (user: Document, userRoles: string[], expiryTime: number) => (
  {
      id: user.toObject()._id,
      username: user.toObject().name,
      expires: expiryTime,
      userRoles
  }
)

export const getSecret = (): string | undefined =>  process.env.SECRET_JWT;

export const getExpiryTime = (): number | undefined =>  Number(process.env.JWT_EXP_TIME_MS);
  