import { Request, Response, NextFunction, RequestHandler } from 'express';

export interface IFilesController {
    uploadAvatar:(req: Request, res: Response, next: NextFunction) => any;
}