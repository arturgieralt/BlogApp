import { NextFunction, Response, Request } from 'express';

export interface IIdentityController {
    verifyFacebookToken: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => any;
}
