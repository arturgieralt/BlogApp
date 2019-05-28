import { UserModel } from '../../models/User/UserModel';
import bcrypt from 'bcrypt';
import {  Model } from 'mongoose';
import passport = require('passport');
import { IVerifyOptions } from 'passport-local';
import { Request, Response, NextFunction } from 'express';
import { IUserModel, IUserDto } from 'models/User/IUserModel';
import { IAuthToken } from '../../factories/Token/IAuthToken';
import { IUserService } from './IUserService';

export default class UserService implements IUserService {
  constructor(private UserRepository: Model<IUserModel, {}>) {
  }

  getAll = (): Promise<IUserModel> => {
    return this.UserRepository.find({}).lean().exec();
  }
  
  getSingle = (id: string): Promise<IUserModel> => {
    return this.UserRepository.findById(id).lean().exec();
  }
  
  getUserProfile = (id: string): Promise<IUserDto> => {
    return this.UserRepository
    .findById(id)
    .select('name email isActive avatarName -_id')
    .lean()
    .exec();
  }
  
  getSingleByName = (name: string): Promise<IUserModel | null> => {
    return this.UserRepository.findOne({ name }).exec();
  }
  
  update = (id: string, body: any): Promise<IUserModel> => {
    return this.UserRepository.findOneAndUpdate({ _id: id }, body, { new: true }).lean().exec();
  }
  
  verify = (id: string): Promise<IUserModel> => {
    return this.UserRepository.findOneAndUpdate({ _id: id }, {isActive: true}).lean().exec();
  }
  
  add = async (name: string,password: string,email: string): Promise<IUserModel> => {
  
     return new Promise(async (resolve, reject) => {
      const rounds: number = Number(process.env.PASS_ROUNDS);
      
      try {
        const passwordHash = await bcrypt.hash(password, rounds);
        const user = new this.UserRepository({
          name,
          passwordHash,
          email,
        });
        const userDoc = await user.save()
        resolve(userDoc.toObject())
      }
      catch(e) {
        reject(e)
      }
    });
   
  }
  
  remove = (id: string): Promise<any> => {
    return this.UserRepository.remove({ _id: id }).exec();
  }
  
  authenticate = (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authPromise = new Promise((resolve, reject) => {
      passport.authenticate(
        'local',
        { session: false },
        async (error: any, user: IAuthToken, options?: IVerifyOptions) => {
          if (error || !user) {
            reject({ ...error, ...options })
          }
          resolve(user)
        }
      )(req, res, next);
    })
  
    return authPromise
    
  }
  
  login = (req: Request, payload: any): Promise<any> => {
   const loginPromise = new Promise((resolve, reject) => {
    req.login(payload, { session: false }, error => {
      if (error) {
        resolve(false);
      }
      resolve(true);
    });
   });
     
   return loginPromise
  }
}