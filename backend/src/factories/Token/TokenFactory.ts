import Permissions from './Permissions';
import { IUserModel } from 'models/User/IUserModel';
import { IVerifyToken } from './IVerifyToken';
import { IAuthToken } from './IAuthToken';
import { ITokenFactory } from './ITokenFactory';
import { IEnvProvider } from 'providers/EnvProvider/IEnvProvider';
import { IJWT } from 'types/externals';

type Authorization = 'AuthToken';
export const Authorization: Authorization = 'AuthToken';

type PassReset = 'PassResetToken';
export const PassReset: PassReset = 'PassResetToken';

type VerifyAccount = 'VerifyAccountToken';
export const VerifyAccount: VerifyAccount = 'VerifyAccountToken';

export type TokenType = Authorization | PassReset | VerifyAccount;

export default class TokenFactory implements ITokenFactory {
    public static TokenTypes = {
        Authorization: Authorization,
        PassReset: PassReset,
        VerifyAccount: VerifyAccount
    };

    public static Permissions = {
        [Authorization]: [Permissions.APP.USE],
        [PassReset]: [Permissions.USER.PASS_RESET],
        [VerifyAccount]: [Permissions.USER.VERIFY]
    };

    public static ExpTime = {
        [Authorization]: 3600000,
        [PassReset]: 3600000,
        [VerifyAccount]: 3600000
    };

    private static TokenOptions = {
        aud: 'webdevag:client',
        iss: 'webdevag:issuer'
    };

    private static TokenOptionsVerify = {
        audience: 'webdevag:client',
        issuer: 'webdevag:issuer'
    };

    public constructor(
        private EnvProvider: IEnvProvider,
        private JsonWebToken: IJWT
    ) {}

    public getAuthToken(
        user: IUserModel,
        userRoles: string[],
        tokenId: string
    ) {
        const { _id } = user;
        const payload: IAuthToken = {
            id: _id,
            exp: Date.now() + TokenFactory.ExpTime[Authorization],
            userRoles,
            tokenId,
            scopes: TokenFactory.Permissions[Authorization],
            ...TokenFactory.TokenOptions
        };

        const token = this.JsonWebToken.sign(
            JSON.stringify(payload),
            this.EnvProvider.get('SECRET_JWT')
        );
        return {
            token,
            payload
        };
    }

    public getVerificationToken(id: string, tokenId: string): string {
        const payload: IVerifyToken = {
            id,
            exp: Date.now() + TokenFactory.ExpTime[VerifyAccount],
            scopes: TokenFactory.Permissions[VerifyAccount],
            tokenId,
            ...TokenFactory.TokenOptions
        };

        return this.JsonWebToken.sign(
            JSON.stringify(payload),
            this.EnvProvider.get('SECRET_JWT')
        );
    }

    public decodeToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.JsonWebToken.verify(
                token,
                this.EnvProvider.get('SECRET_JWT'),
                TokenFactory.TokenOptionsVerify,
                async function(err: any, decoded: any) {
                    if (!err) {
                        resolve(decoded);
                    } else {
                        reject(err);
                    }
                }
            );
        });
    }

    public verifyToken(token: string, tokenType: TokenType): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const decoded:
                    | IAuthToken
                    | IVerifyToken = await this.decodeToken(token);
                const doScopesMatch =
                    JSON.stringify(decoded.scopes) ===
                    JSON.stringify(TokenFactory.Permissions[tokenType]);
                if (doScopesMatch) {
                    resolve(decoded);
                } else {
                    reject('Wrong scopes');
                }
            } catch (e) {
                reject(e);
            }
        });
    }
}
