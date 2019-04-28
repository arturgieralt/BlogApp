import { UserModel } from './../models/UserModel';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export function getAll(): Promise<Document | {}> {
  return UserModel.find({}).exec();
}

export function getSingle(id: string): Promise<Document | null> {
  return UserModel.findById(id).exec();
}

export function getSingleByName(name: string): Promise<Document | null> {
  return UserModel.findOne({ name }).exec();
}

export function update(id: string, body: any): Promise<Document | null> {
  return UserModel.findOneAndUpdate({ _id: id }, body, { new: true }).exec();
}

export function verify(id: string): Promise<Document | null> {
  return UserModel.findOneAndUpdate({ _id: id }, {isActive: true}).exec();
}

export function add(
  name: string,
  passwordHash: string,
  email: string
): Promise<Document> {
  const article = new UserModel({
    name,
    passwordHash,
    email,
    _id: new mongoose.Types.ObjectId()
  });
 return article.save();
}

export function remove(id: string): Promise<any> {
  return UserModel.remove({ _id: id }).exec();
}
