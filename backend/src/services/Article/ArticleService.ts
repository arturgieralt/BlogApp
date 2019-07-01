import mongoose, { Model } from 'mongoose';
import { IArticleService } from './IArticleService';
import {
    IArticleModel,
    IArticle,
    IArticleWithId,
    IArticleLiteWithId
} from 'models/Article/IArticleModel';
import { getQueryObject } from './helpers';
import { IFindArticleDto } from 'dtos/article/IFindArticle';
import { ITag } from 'models/Tag/ITagModel';
import { IUpdateArticle } from 'dtos/article/IUpdateArticle';
import { IAddArticle } from 'dtos/article/IAddArticle';
import { DeleteWriteOpResultObject } from 'mongodb';
import { IDeleteResultObject } from 'models/common/IDeleteResultObject';

export default class ArticleService implements IArticleService {
    public constructor(private ArticleModel: Model<IArticleModel, {}>) {}

    public get = (data: IFindArticleDto): Promise<IArticleLiteWithId[]> => {
        return this.ArticleModel.find(getQueryObject(data))
            .select('title summary tags created_date')
            .lean()
            .populate({
                path: 'author',
                select: 'name'
            })
            .exec();
    };

    public getSingle = (id: string): Promise<IArticleWithId | null> => {
        return this.ArticleModel.findById(id)
            .select('-__v')
            .populate({
                path: 'author',
                select: 'name'
            })
            .lean()
            .exec();
    };

    public getTagsCounted = (): Promise<ITag[]> => {
        return new Promise(async (resolve, reject) => {
            await this.ArticleModel.aggregate(
                [
                    { $project: { _id: 0, tags: 1 } },
                    { $unwind: '$tags' },
                    { $project: { tags: { $toLower: '$tags' } } },
                    {
                        $group: {
                            _id: '$tags',
                            count: { $sum: 1 }
                        }
                    },
                    { $sort: { count: -1 } }
                ],
                (err: Error, res: ITag[]) => {
                    if (err) return reject(err);
                    return resolve(res);
                }
            );
        });
    };

    public update = (
        id: string,
        body: IUpdateArticle
    ): Promise<IArticleWithId | null> => {
        return this.ArticleModel.findOneAndUpdate(
            { _id: id },
            {
                ...body,
                last_updated: Date.now()
            },
            {
                new: true
            }
        )
            .select('-__v')
            .populate({
                path: 'author',
                select: 'name'
            })
            .lean()
            .exec();
    };

    public add = (
        body: IAddArticle,
        authorId: string
    ): Promise<IArticleModel> => {
        const article = new this.ArticleModel({
            ...body,
            tags: body.tags.map((t: string) => t.toLowerCase().trim()),
            author: authorId,
            _id: new mongoose.Types.ObjectId()
        });
        return article.save();
    };

    public remove = (id: string): Promise<IDeleteResultObject> => {
        return this.ArticleModel.remove({ _id: id }).exec();
    };
}
