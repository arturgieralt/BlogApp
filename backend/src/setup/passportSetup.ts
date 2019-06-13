import passport from 'passport';
import { Strategy as StrategyLocal } from 'passport-local';
import { ExtractJwt, Strategy as StrategyJWT } from 'passport-jwt';
import { validateToken } from '../middlewares/ValidateToken';
import { IVerifyUserMiddleware } from '../middlewares/VerifyUser/IVerifyUser';

const secret = process.env.SECRET_JWT;

export const initPassport = (VerifyUserMiddleware: IVerifyUserMiddleware) => {
    passport.use(
        new StrategyLocal(
            {
                usernameField: 'name',
                passwordField: 'password'
            },
            VerifyUserMiddleware.verifyUser
        )
    );

    passport.use(
        new StrategyJWT(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: secret
            },
            validateToken
        )
    );
};
