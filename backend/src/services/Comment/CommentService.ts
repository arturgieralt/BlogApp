import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { ICommentModel } from 'models/Comment/ICommentModel';
import { ICommentService } from './ICommentService';

export default  class CommentService implements ICommentService {
  constructor (private CommentModel: Model<ICommentModel, {}>) {

  }

  getAll(): Promise<ICommentModel | {}> {
    return this.CommentModel.find({}).exec();
  }
  
  getAllForArticle(id: string ): Promise<ICommentModel[]> {
    return this.CommentModel
      .find({article: id})
      .populate({
        path: 'author',
        select: 'name'
      })
      .lean()
      .exec();
  }
  
  getSingle(id: string): Promise<ICommentModel | null> {
    return this.CommentModel.findById(id).exec();
  }
  
  update(id: string, body: any): Promise<ICommentModel | null> {
    return this.CommentModel.findOneAndUpdate({ _id: id }, body, { new: true }).exec();
  }
  
  add(body: any): Promise<ICommentModel> {
    const article = new this.CommentModel({
      ...body,
      _id: new mongoose.Types.ObjectId()
    });
    return article.save();
  }
  
  remove(id: string): Promise<any> {
    return this.CommentModel.remove({ _id: id }).exec();
  }
}


