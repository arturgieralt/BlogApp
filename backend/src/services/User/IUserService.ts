import { IUserModel, IUserDto } from 'models/User/IUserModel';
import { Request, Response, NextFunction } from 'express';

export interface IUserService {
    getAll: () => Promise<IUserModel>;
    getSingle: (id: string) => Promise<IUserModel>;
    getUserProfile: (id: string) => Promise<IUserDto>;
    getSingleByName: (name: string) => Promise<IUserModel | null>;
    update: (id: string, body: any) => Promise<IUserModel>;
    verify: (id: string) => Promise<IUserModel>;
    add: (name: string, password: string, email: string) => Promise<IUserModel>;
    remove: (id: string) => Promise<any>;
    authenticate: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<any>;
    login: (req: Request, payload: any) => Promise<any>;
}
