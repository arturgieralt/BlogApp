import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { ICommentModel, ICommentWithId } from 'models/Comment/ICommentModel';
import { ICommentService } from './ICommentService';
import { IUpdateComment } from 'dtos/comment/IUpdateComment';

export default class CommentService implements ICommentService {
    public constructor(private CommentModel: Model<ICommentModel, {}>) {}

    public get(articleId?: string): Promise<ICommentWithId[]> {
        const queryObject = articleId ? { article: articleId } : {};
        return new Promise(async (resolve, reject) => {
            try {
                const comments: ICommentModel[] = await this.CommentModel.find(
                    queryObject
                )
                    .select('-__v')
                    .populate({
                        path: 'author',
                        select: 'name'
                    })
                    .exec();

                const commentObjects: ICommentWithId[] = comments.map(c => {
                    const {
                        _id,
                        validContent: content,
                        author,
                        article,
                        created_date,
                        isRemoved
                    } = c.toJSON({ virtuals: true });

                    return {
                        _id,
                        content,
                        author,
                        article,
                        created_date,
                        isRemoved
                    };
                });
                resolve(commentObjects);
            } catch (e) {
                reject(e);
            }
        });
    }

    public update(
        id: string,
        body: IUpdateComment
    ): Promise<ICommentWithId | null> {
        return this.CommentModel.findOneAndUpdate({ _id: id }, body, {
            new: true
        })
            .select('-__v')
            .populate({
                path: 'author',
                select: 'name'
            })
            .lean()
            .exec();
    }

    public add(
        content: string,
        articleId: string,
        authorId: string
    ): Promise<ICommentModel> {
        const article = new this.CommentModel({
            content,
            author: authorId,
            article: articleId,
            _id: new mongoose.Types.ObjectId()
        });
        return article.save();
    }
}
