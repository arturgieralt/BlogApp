import { IUserModel, IUserDto, facebook } from 'models/User/IUserModel';
import { Request, Response, NextFunction } from 'express';

export interface IUserService {
    getAll: () => Promise<IUserModel>;
    getSingle: (id: string) => Promise<IUserModel>;
    getUserProfile: (id: string) => Promise<IUserDto>;
    getSingleByName: (name: string) => Promise<IUserModel | null>;
    getSingleByMail: (name: string) => Promise<IUserModel | null>;
    update: (id: string, body: any) => Promise<IUserModel>;
    verify: (id: string, verificationCode: string) => Promise<IUserModel>;
    add: (name: string, password: string, email: string) => Promise<IUserModel>;
    addExternal: (
        name: string,
        email: string,
        externalId: string,
        avatarUrl: string,
        accountType: facebook
    ) => Promise<IUserModel>;
    remove: (id: string) => Promise<any>;
    authenticate: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<any>;
    login: (req: Request, payload: any) => Promise<any>;
}
