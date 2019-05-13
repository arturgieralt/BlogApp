import {  Model } from 'mongoose';
import { ITokenModel } from 'models/ITokenModel';
import TokenFactory, { Authorization, VerifyAccount, TokenType } from './TokenFactory';
import { TokenModel } from './../../models/TokenModel';
import { IUserModel } from 'models/IUserModel';
import { IAuthToken } from './IAuthToken';
import { IVerifyToken } from './IVerifyToken';

export class TokenService {
  constructor(private TokenRepository: Model<ITokenModel, {}>, private TokenFactoryInstance: TokenFactory) {
  }

  add = (body: any): Promise<ITokenModel> => {
    const token = new this.TokenRepository({
      ...body,
    });
    return token.save();
  }

  blacklist = (id: string): Promise<ITokenModel | null> => {
    return this.TokenRepository.findOneAndUpdate({ _id: id }, {isActive: false}, { new: true }).exec();
  }

  blacklistAllForUser = (id: string): Promise<ITokenModel | null> => {
    return this.TokenRepository.updateMany({ userId: id }, {isActive: false}, { new: true }).exec();
  }
  getAll = (): Promise<ITokenModel | {}> => {
    return this.TokenRepository.find({}).exec();
  }
  
  getAllForUser = (id: string ): Promise<ITokenModel[]> => {
    return this.TokenRepository
      .find({userId: id})
      .exec();
  }
  
  getSingle = (id: string): Promise<ITokenModel> => {
    return this.TokenRepository.findById(id).lean().exec();
  }
  
  remove = (id: string): Promise<ITokenModel> => {
    return this.TokenRepository.remove({ _id: id }).exec();
  }

  verifyToken = (token: string, tokenType:TokenType ): Promise<IAuthToken | IVerifyToken> => {
    return this.TokenFactoryInstance.verifyToken(token, tokenType);
  }
  
  createVerificationToken =  (id: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const tokenEntry = await this.add({
            userId: id,
            expTime: TokenFactory.ExpTime[VerifyAccount],
            isActive: true
          });
        
        resolve(this.TokenFactoryInstance
          .getVerificationToken(id, 
              tokenEntry.id));
      }
  
        catch(e){
          reject(e);
        }
    })
  }
  
 createToken = (user: IUserModel, userRoles: string[]): Promise<any> => {
        
    return new Promise(async (resolve, reject) => {
      try {
  
        const tokenEntry = await this.add({
            userId: user.id,
            expTime: TokenFactory.ExpTime[Authorization],
            isActive: true
          });
        
        resolve(this.TokenFactoryInstance
          .getAuthToken(user, 
              userRoles, 
              tokenEntry.id));
      }
  
        catch(e) {
          reject(e);
        }
    })
  }
}

const TokenServiceInstance = new TokenService(TokenModel, new TokenFactory());
export default TokenServiceInstance;