import { Document, Model } from 'mongoose';
import { ITokenModel } from 'models/ITokenModel';
import TokenFactory, { Authorization, VerifyAccount, TokenType } from './TokenFactory';
import { TokenModel } from './../../models/TokenModel';
import { IUserModel } from 'models/IUserModel';

export class TokenService {
  constructor(private TokenRepository: Model<ITokenModel, {}>, private TokenFactory: TokenFactory) {
  }

  add(body: any): Promise<Document> {
    const token = new this.TokenRepository({
      ...body,
    });
    return token.save();
  }

  blacklist(id: string): Promise<Document | null> {
    return this.TokenRepository.findOneAndUpdate({ _id: id }, {isActive: false}, { new: true }).exec();
  }

  blacklistAllForUser(id: string): Promise<Document | null> {
    return this.TokenRepository.updateMany({ userId: id }, {isActive: false}, { new: true }).exec();
  }
  getAll(): Promise<Document | {}> {
    return this.TokenRepository.find({}).exec();
  }
  
  getAllForUser(id: string ): Promise<Object[]> {
    return this.TokenRepository
      .find({userId: id})
      .exec();
  }
  
  getSingle(id: string): Promise<Object | null> {
    return this.TokenRepository.findById(id).lean().exec();
  }
  
  remove(id: string): Promise<any> {
    return this.TokenRepository.remove({ _id: id }).exec();
  }

  verifyToken(token: string, tokenType:TokenType ): Promise<any> {
    return this.TokenFactory.verifyToken(token, tokenType);
  }
  
  createVerificationToken (id: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
  
        const tokenEntry = await this.add({
            userId: id,
            expTime: TokenFactory.ExpTime[VerifyAccount],
            isActive: true
          });
        
        resolve(this.TokenFactory
          .getVerificationToken(id, 
              tokenEntry.id));
      }
  
        catch(e) {
          reject(e);
        }
    })
  }
  
 createToken(user: IUserModel, userRoles: string[]): Promise<any> {
        
    return new Promise(async (resolve, reject) => {
      try {
  
        const tokenEntry = await this.add({
            userId: user._id,
            expTime: TokenFactory.ExpTime[Authorization],
            isActive: true
          });
        
        resolve(this.TokenFactory
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

export default new TokenService(TokenModel, new TokenFactory());