import { Request, Response, NextFunction } from 'express';

export interface IUsersController {
    getAll: (req: Request, res: Response, next: NextFunction) => any;
    getSingle: (req: Request, res: Response, next: NextFunction) => any;
    update: (req: Request, res: Response, next: NextFunction) => any;
    getMyProfile: (req: Request, res: Response, next: NextFunction) => any;
    register: (req: Request, res: Response, next: NextFunction) => any;
    verify: (req: Request, res: Response, next: NextFunction) => any;
    login: (req: Request, res: Response, next: NextFunction) => any;
    logout: (req: Request, res: Response) => any;
    remove: (req: Request, res: Response, next: NextFunction) => any;
    getAvatar: (req: Request, res: Response, next: NextFunction) => any;
}
