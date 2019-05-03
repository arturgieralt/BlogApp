import { Request, Response, NextFunction } from 'express';
import passport = require('passport');
import { getRolesPerUser } from './../services/RolesService';
import TokenServiceInstance from './../services/TokenService/TokenService';

export const authorize = (roles: string[] = []) => [
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const tokenStatus = await TokenServiceInstance.getSingle(user.tokenId);
      if( tokenStatus && (tokenStatus as any).isActive) {
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
