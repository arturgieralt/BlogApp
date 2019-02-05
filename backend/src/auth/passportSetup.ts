import passport from 'passport';
import { Strategy as StrategyLocal } from 'passport-local';
import { ExtractJwt, Strategy as StrategyJWT } from 'passport-jwt';
import { verifyUser, validateToken } from './helpers';

const secret = process.env.SECRET_JWT;

export const initPassport = () => {
  passport.use(
    new StrategyLocal(
      {
        usernameField: 'name',
        passwordField: 'password'
      },
      verifyUser
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
