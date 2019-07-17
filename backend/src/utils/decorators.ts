import { Request, Response, NextFunction } from 'express';

export const errorHandling = (fn: any) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await fn(req, res, next);
    } catch (e) {
        next(e);
    }
};
