import { Request, Response, NextFunction } from 'express';
import passport = require('passport');
import { getRolesPerUser } from './../services/RolesService';
import TokenServiceInstance from './../services/TokenService/TokenService';
import { IAuthToken } from 'services/TokenService/IAuthToken';
import TokenFactory, { Authorization } from './../services/TokenService/TokenFactory';

export const authorize = (roles: string[] = []) => [
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { user }: {user?: IAuthToken } = req;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const tokenStatus = await TokenServiceInstance.getSingle(user.tokenId);
      const areTheScopesOk = JSON.stringify(user.scopes) === JSON.stringify(TokenFactory.Permissions[Authorization])
      if( tokenStatus && (tokenStatus as any).isActive && areTheScopesOk) {
        if (roles.length > 0) {
          const roles = await getRolesPerUser(user.id);
          if (roles.length === 0) {
            return res.status(401).json({ message: 'Unauthorized' });
          }
    
          const hasRole = roles.some(r => (roles as any).includes(r));
          if (!hasRole) {
            return res.status(401).json({ message: 'Unauthorized' });
          }
        }
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }

    } catch(e) {
      return res.status(401).json({ message: 'Something went wrong. Cannot authorize.' });
    }
  }
];
