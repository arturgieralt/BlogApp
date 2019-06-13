import { IAuthToken } from 'factories/Token/IAuthToken';
import { VerifiedCallback } from 'passport-jwt';

export const validateToken = (payload: IAuthToken, done: VerifiedCallback) => {
    const hasTokenExpired = Date.now() > payload.exp;
    return hasTokenExpired ? done('jwt expired') : done(null, payload);
};
