import { NextFunction, Response, Request } from 'express';

export interface ICaptchaController {
    verifyToken: (req: Request, res: Response, next: NextFunction) => any;
}
