import { Request, Response, NextFunction } from 'express';

export interface IArticlesController {
    getAll: (req: Request, res: Response,  next: NextFunction) => any;
    getSingle: (req: Request, res: Response,  next: NextFunction) => any;
    update: (req: Request, res: Response,  next: NextFunction) => any;
    add: (req: Request, res: Response,  next: NextFunction) => any;
    remove: (req: Request, res: Response,  next: NextFunction) => any;
}