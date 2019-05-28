import { ITokenModel } from "models/Token/ITokenModel";
import { TokenType } from "factories/Token/TokenFactory";
import { IAuthToken } from "factories/Token/IAuthToken";
import { IVerifyToken } from "factories/Token/IVerifyToken";
import { IUserModel } from "models/User/IUserModel";

export interface ITokenService {
    add: (body: any) => Promise<ITokenModel>; 
    blacklist: (id: string) => Promise<ITokenModel | null>;
    blacklistAllForUser: (id: string) => Promise<ITokenModel | null>;
    getAll: () => Promise<ITokenModel | {}>;
    getAllForUser: (id: string ) => Promise<ITokenModel[]>;
    getSingle: (id: string) => Promise<ITokenModel>;
    remove: (id: string) => Promise<ITokenModel>;
    verifyToken: (token: string, tokenType:TokenType ) => Promise<IAuthToken | IVerifyToken>;
    createVerificationToken:  (id: string) => Promise<string>;
    createToken: (user: IUserModel, userRoles: string[]) => Promise<any>;
}