
import * as jwt from 'jsonwebtoken';
import Permissions from './Permissions';
import { Document } from 'mongoose';
import { IUserModel } from 'models/IUserModel';

type Authorization = 'AuthToken';
export const Authorization: Authorization = 'AuthToken';

type PassReset = 'PassResetToken';
export const PassReset: PassReset = 'PassResetToken';

type VerifyAccount = 'VerifyAccountToken';
export const VerifyAccount: VerifyAccount = 'VerifyAccountToken';

type TokenType = Authorization | PassReset | VerifyAccount;

export const getSecret = (): string  =>  {

    const secret = process.env.SECRET_JWT;
    if(secret === undefined) {
        throw new Error('Cannot get secret');
    }
    return secret;
}

export const createTokenPayload = (user: IUserModel, userRoles: string[], expiryTime: number, tokenId: string) => {
    const { _id, name, email} = user;
    return {
     id: _id,
     name,
     email,
     expires: expiryTime,
     userRoles,
     tokenId
   }
 }

export default class TokenFactory {
    
    static TokenTypes = {
        Authorization: Authorization,
        PassReset: PassReset,
        VerifyAccount: VerifyAccount

    }
    
    static Permissions = {
        [Authorization]: Permissions.APP.USE,
        [PassReset]: Permissions.USER.PASS_RESET,
        [VerifyAccount]: Permissions.USER.VERIFY
    }

    static ExpTime = {
        [Authorization]: 3600000,
        [PassReset]: 3600000,
        [VerifyAccount]: 3600000
    }

    private secret: string;
    constructor() {
        this.secret = getSecret();
    }

    getAuthToken(user: IUserModel, userRoles: string[], tokenId: string){
      const payload = createTokenPayload(
        user, 
        userRoles, 
        Number(Date.now() + TokenFactory.ExpTime[Authorization]), 
        tokenId
        );
    
      const token = jwt.sign(JSON.stringify(payload), this.secret);
      return {
        token,
        payload
      };
    }

    getVerificationToken(id: string) {
        return jwt.sign(JSON.stringify({
            id,
            expTime: TokenFactory.ExpTime[VerifyAccount],
            scopes: TokenFactory.Permissions[VerifyAccount]
          }), this.secret);
    }
    

}