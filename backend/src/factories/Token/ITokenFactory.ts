import { IAuthToken } from './IAuthToken';
import { IUserModel } from 'models/User/IUserModel';
import { TokenType } from './TokenFactory';

export interface ITokenFactory {
    getAuthToken: (
        user: IUserModel,
        userRoles: string[],
        tokenId: string
    ) => { payload: IAuthToken; token: string };

    getVerificationToken: (id: string, tokenId: string) => string;

    decodeToken: (token: string) => Promise<any>;

    verifyToken: (token: string, tokenType: TokenType) => Promise<any>;
}
