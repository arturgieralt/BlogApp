import passport from 'passport';
import { Strategy as StrategyLocal } from 'passport-local';
import { IVerifyUserMiddleware } from '../middlewares/VerifyUser/IVerifyUser';
import { IUserService } from 'services/User/IUserService';

export const initPassport = (
    VerifyUserMiddleware: IVerifyUserMiddleware,
    UserService: IUserService
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

    passport.serializeUser(function(user: any, done) {
        done(null, user._id);
    });

    passport.deserializeUser(async function(id: string, done) {
        try {
            const user = await UserService.getSingle(id);
            done(null, user);
        } catch (e) {
            done(e);
        }
    });

};
