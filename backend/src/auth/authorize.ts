import { Request, Response, NextFunction } from 'express';
import passport = require('passport');
import { getRolesPerUser } from './../services/RolesService';
import { Document } from 'mongoose';

export const authorize = (roles: string[] = []) => [
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (roles.length > 0) {
      const rolesDocs = await getRolesPerUser(user.id);
      if (rolesDocs === null) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const userRoles: string[] = rolesDocs.map(
        (roleDoc: Document) => roleDoc.toObject().roleName
      );

      const hasRole = userRoles.some(r => (roles as any).includes(r));
      if (!hasRole) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    }
    next();
  }
];
