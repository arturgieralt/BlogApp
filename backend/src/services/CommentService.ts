import { CommentModel } from './../models/CommentModel';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export function getAll(): Promise<Document | {}> {
  return CommentModel.find({}).exec();
}

// export function getAllForArticle(id): Promise<Document | {}> {
//   return CommentModel.find({}).exec();
// }

export function getSingle(id: string): Promise<Document | null> {
  return CommentModel.findById(id).exec();
}

export function update(id: string, body: any): Promise<Document | null> {
  return CommentModel.findOneAndUpdate({ _id: id }, body, { new: true }).exec();
}

export function add(body: any): Promise<Document> {
  const article = new CommentModel({
    ...body,
    _id: new mongoose.Types.ObjectId()
  });
  return article.save();
}

export function remove(id: string): Promise<any> {
  return CommentModel.remove({ _id: id }).exec();
}
