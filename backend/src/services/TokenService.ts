import { TokenModel } from './../models/TokenModel';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export function getAll(): Promise<Document | {}> {
  return TokenModel.find({}).exec();
}

export function getAllForUser(id: string ): Promise<Object[]> {
  return TokenModel
    .find({userId: id})
    .exec();
}

export function getSingle(id: string): Promise<Object | null> {
  return TokenModel.findById(id).lean().exec();
}

export function blacklist(id: string): Promise<Document | null> {
  return TokenModel.findOneAndUpdate({ _id: id }, {isActive: false}, { new: true }).exec();
}

export function add(body: any): Promise<Document> {
  const token = new TokenModel({
    ...body,
    _id: new mongoose.Types.ObjectId()
  });
  return token.save();
}

export function remove(id: string): Promise<any> {
  return TokenModel.remove({ _id: id }).exec();
}
