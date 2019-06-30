import mongoose, { Model } from 'mongoose';
import { IArticleService } from './IArticleService';
import { IArticleModel } from 'models/Article/IArticleModel';
import { getQueryObject } from './helpers';
import { IFindArticleDto } from 'dtos/IFindArticle';

export default class ArticleService implements IArticleService {
    public constructor(private ArticleModel: Model<IArticleModel, {}>) {}

    public get = (data: IFindArticleDto) => {
        return this.ArticleModel.find(getQueryObject(data))
            .select('title summary tags created_date')
            .lean()
            .populate({
                path: 'author',
                select: 'name'
            })
            .exec();
    };

    public getSingle = (id: string): Promise<Record<string, any> | null> => {
        return this.ArticleModel.findById(id)
            .populate({
                path: 'author',
                select: 'name'
            })
            .lean()
            .exec();
    };

    public getTagsCounted = (): Record<string, any> => {
        return new Promise(async (resolve, reject) => {
            await this.ArticleModel.aggregate(
                [
                    { $project: { _id: 0, tags: 1 } },
                    { $unwind: '$tags' },
                    {
                        $group: {
                            _id: '$tags',
                            count: { $sum: 1 }
                        }
                    }
                ],
                (err: Error, res: Record<string, any>) => {
                    if (err) return reject(err);
                    return resolve(res);
                }
            );
        });
    };

    public update = (id: string, body: any): Promise<IArticleModel | null> => {
        return this.ArticleModel.findOneAndUpdate({ _id: id }, body, {
            new: true
        }).exec();
    };

    public add = (body: any, authorId: string): Promise<IArticleModel> => {
        const article = new this.ArticleModel({
            ...body,
            tags: body.tags.map((t: string) => t.trim()),
            author: authorId,
            _id: new mongoose.Types.ObjectId()
        });
        return article.save();
    };

    public remove = (id: string): Promise<any> => {
        return this.ArticleModel.remove({ _id: id }).exec();
    };
}
