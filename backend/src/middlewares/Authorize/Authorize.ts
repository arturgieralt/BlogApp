import { Request, Response, NextFunction } from 'express';
import passport = require('passport');
import { IAuthToken } from '../../factories/Token/IAuthToken';
import TokenFactory, {
    Authorization
} from '../../factories/Token/TokenFactory';
import { ITokenModel } from '../../models/Token/ITokenModel';
import { IRoleService } from '../../services/Role/IRoleService';
import { ITokenService } from '../../services/TokenService/ITokenService';

export default class AuthorizeMiddleware {
    public constructor(
        private RoleService: IRoleService,
        private TokenService: ITokenService
    ) {}

    public authorize = (
        roles: string[] = [],
        scopes: string[] = TokenFactory.Permissions[Authorization]
    ) => [
        passport.authenticate('jwt', { session: false }),
        async (req: Request, res: Response, next: NextFunction) => {
            const { user }: { user?: IAuthToken } = req;
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            try {
                const tokenStatus: ITokenModel = await this.TokenService.getSingle(
                    user.tokenId
                );
                const areTheScopesOk =
                    JSON.stringify(user.scopes) === JSON.stringify(scopes);
                if (tokenStatus && tokenStatus.isActive && areTheScopesOk) {
                    if (roles.length > 0) {
                        const roles = await this.RoleService.getRolesPerUser(
                            user.id
                        );
                        if (roles.length === 0) {
                            return res
                                .status(401)
                                .json({ message: 'Unauthorized' });
                        }

                        const hasRole = roles.some(r =>
                            (roles as any).includes(r)
                        );
                        if (!hasRole) {
                            return res
                                .status(401)
                                .json({ message: 'Unauthorized' });
                        }
                    }
                    next();
                } else {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
            } catch (e) {
                return res.status(401).json({
                    message: 'Something went wrong. Cannot authorize.'
                });
            }
        }
    ];
}
