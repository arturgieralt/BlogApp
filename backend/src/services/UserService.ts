import { UserModel } from './../models/UserModel';
import bcrypt from 'bcrypt';
import { Document, Model } from 'mongoose';
import mongoose from 'mongoose';
import passport = require('passport');
import { IVerifyOptions } from 'passport-local';
import { Request, Response, NextFunction } from 'express';
import { IUserModel, IUserDto } from 'models/IUserModel';


export function getAll(): Promise<IUserModel> {
  return UserModel.find({}).lean().exec();
}

export function getSingle(id: string): Promise<IUserModel> {
  return UserModel.findById(id).lean().exec();
}

export function getUserProfile(id: string): Promise<IUserDto> {
  return UserModel
  .findById(id)
  .select('name email isActive avatarUrl -_id')
  .lean()
  .exec();
}

export function getSingleByName(name: string): Promise<IUserModel> {
  return UserModel.findOne({ name }).lean().exec();
}

export function update(id: string, body: any): Promise<IUserModel> {
  return UserModel.findOneAndUpdate({ _id: id }, body, { new: true }).lean().exec();
}

export function verify(id: string): Promise<IUserModel> {
  return UserModel.findOneAndUpdate({ _id: id }, {isActive: true}).lean().exec();
}

export async function add(name: string,password: string,email: string): Promise<IUserModel> {

   return new Promise(async (resolve, reject) => {
    const rounds: number = Number(process.env.PASS_ROUNDS);
    
    try {
      const passwordHash = await bcrypt.hash(password, rounds);
      const user = new UserModel({
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

export function remove(id: string): Promise<any> {
  return UserModel.remove({ _id: id }).exec();
}

export function authenticate(req: Request, res: Response, next: NextFunction): Promise<any> {
  const authPromise = new Promise((resolve, reject) => {
    passport.authenticate(
      'local',
      { session: false },
      async (error: any, user: Document, options?: IVerifyOptions) => {
        if (error || !user) {
          reject({ ...error, ...options })
        }
        resolve(user)
      }
    )(req, res, next);
  })

  return authPromise
  
}

export function login(req: Request, payload: any): Promise<any> {
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