import mongoose, { Model } from 'mongoose';
import { IArticleService } from './IArticleService';
import { IArticleModel } from 'models/Article/IArticleModel';

export default class ArticleService implements IArticleService {

  constructor (private ArticleModel: Model<IArticleModel, {}>){
    
  }

  getAll = (): Promise<IArticleModel | {}> => {
    return this.ArticleModel.find({})
      .select('title summary tags created_date')
      .populate({
        path: 'author',
        select: 'name'
      })
      .exec();
  }
  
  getSingle = (id: string): Promise<Object | null> => {
    return this.ArticleModel
      .findById(id)
      .populate({
        path: 'author',
        select: 'name'
      })
      .lean()
      .exec();
  }
  
  update = (id: string, body: any): Promise<IArticleModel | null> => {
    return this.ArticleModel.findOneAndUpdate({ _id: id }, body, { new: true }).exec();
  }
  
  add = (body: any): Promise<IArticleModel> => {
    const article = new this.ArticleModel({
      ...body,
      _id: new mongoose.Types.ObjectId()
    });
    return article.save();
  }
  
  remove = (id: string): Promise<any> => {
    return this.ArticleModel.remove({ _id: id }).exec();
  }
  
}

