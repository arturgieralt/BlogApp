import { Request, Response, NextFunction } from 'express';
import { IRoleService } from '../../services/Role/IRoleService';

export default class AuthorizeMiddleware {
    public constructor(private RoleService: IRoleService) {}

    public authorize = (roles: string[] = []) => [
        async (req: Request, res: Response, next: NextFunction) => {
            if (req.isAuthenticated()) {
                const id = req.user._id;

                if (roles.length > 0) {
                    const userRoles = await this.RoleService.getRolesPerUser(
                        id
                    );

                    if (userRoles.length === 0) {
                        return next({ message: 'Unauthorized' });
                    }

                    const hasRole = roles.some(r => userRoles.includes(r));
                    if (!hasRole) {
                        next({ message: 'Unauthorized' });
                    }
                }

                next();
            } else {
                next({ message: 'Unauthorized' });
            }
        }
    ];
}
