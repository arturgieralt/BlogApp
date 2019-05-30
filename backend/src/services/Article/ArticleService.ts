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

  getAllByTags = (tags: string[], containsAll: boolean): Promise<IArticleModel | {}> => {
    
    const query = containsAll
        ? {
          tags: {$all: tags}
        }
        : {
          tags: {$in: tags}
        }
    
    return this.ArticleModel
      .find(query)
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

  getTagsCounted = (): Object => {
    return new Promise(async (resolve, reject) => {
      await this.ArticleModel.aggregate([
    { $project: {_id: 0,  tags: 1 } },
    { $unwind: '$tags' },
    { $group: { 
           _id: '$tags' ,
           count: { $sum: 1 }
      }
    }
    ], (err: Error, res: Object) => {
      if(err) return reject(err);
      return resolve(res);
    })}
    )
  }
  
  update = (id: string, body: any): Promise<IArticleModel | null> => {
    return this.ArticleModel.findOneAndUpdate({ _id: id }, body, { new: true }).exec();
  }
  
  add = (body: any, authorId: string): Promise<IArticleModel> => {
    const article = new this.ArticleModel({
      ...body,
      tags: body.tags.map((t: string) => t.trim()),
      author: authorId,
      _id: new mongoose.Types.ObjectId()
    });
    return article.save();
  }
  
  remove = (id: string): Promise<any> => {
    return this.ArticleModel.remove({ _id: id }).exec();
  }
  
}

