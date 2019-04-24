import { ArticleModel } from './../models/ArticleModel';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export function getAll(): Promise<Document | {}> {
  return ArticleModel.find({})
    .select('title summary tags created_date')
    .populate({
      path: 'author',
      select: 'name'
    })
    .exec();
}

export function getSingle(id: string): Promise<Document | null> {
  return ArticleModel
    .findById(id)
    .populate({
      path: 'author',
      select: 'name'
    })
    .populate('comments')
    .exec();
}

export function update(id: string, body: any): Promise<Document | null> {
  return ArticleModel.findOneAndUpdate({ _id: id }, body, { new: true }).exec();
}

export function add(body: any): Promise<Document> {
  const article = new ArticleModel({
    ...body,
    _id: new mongoose.Types.ObjectId()
  });
  return article.save();
}

export function remove(id: string): Promise<any> {
  return ArticleModel.remove({ _id: id }).exec();
}
