import passport from 'passport';
import { Strategy as StrategyLocal } from 'passport-local';
import { ExtractJwt, Strategy as StrategyJWT } from 'passport-jwt';
import { validateToken } from '../middlewares/ValidateToken';
import { IVerifyUserMiddleware } from '../middlewares/VerifyUser/IVerifyUser';
import { IEnvProvider } from 'providers/EnvProvider/IEnvProvider';

export const initPassport = (
    VerifyUserMiddleware: IVerifyUserMiddleware,
    EnvProvider: IEnvProvider
) => {
    passport.use(
        new StrategyLocal(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            VerifyUserMiddleware.verifyUser
        )
    );

    passport.use(
        new StrategyJWT(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: EnvProvider.get('SECRET_JWT')
            },
            validateToken
        )
    );
};
