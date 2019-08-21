import passport from 'passport';
import { Strategy as StrategyLocal } from 'passport-local';
import { ExtractJwt, Strategy as StrategyJWT } from 'passport-jwt';
import { validateToken } from '../middlewares/ValidateToken';
import { IVerifyUserMiddleware } from '../middlewares/VerifyUser/IVerifyUser';
import { IEnvProvider } from 'providers/EnvProvider/IEnvProvider';
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
        console.log('DESERIALIZE');
        try {
            const user = await UserService.getSingle(id);
            done(null, user);
        } catch (e) {
            done(e);
        }
    });

    // passport.use(
    //     new StrategyJWT(
    //         {
    //             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //             secretOrKey: EnvProvider.get('SECRET_JWT')
    //         },
    //         validateToken
    //     )
    // );
};
