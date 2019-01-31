import { ArticleModel } from './../models/ArticleModel';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export function getAllArticles(): Promise<Document | {}> {
  return ArticleModel.find({})
    .populate('author')
    .exec();
}

export function getSingleArticle(username: string): Promise<Document | null> {
  return ArticleModel.findById(username).exec();
}

export function updateArticle(id: string, body: any): Promise<Document | null> {
  return ArticleModel.findOneAndUpdate({ _id: id }, body, { new: true }).exec();
}

export function addArticle(body: any): Promise<Document> {
  const article = new ArticleModel({
    ...body,
    _id: new mongoose.Types.ObjectId()
  });
  return article.save();
}

export function deleteArticle(id: string): Promise<any> {
  return ArticleModel.remove({ _id: id }).exec();
}
