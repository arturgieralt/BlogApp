import mongoose, { Model } from 'mongoose';
import { IArticleService } from './IArticleService';
import { IArticleModel } from 'models/Article/IArticleModel';

export default class ArticleService implements IArticleService {
    public constructor(private ArticleModel: Model<IArticleModel, {}>) {}

    public getAll = (): Promise<IArticleModel | {}> => {
        return this.ArticleModel.find({})
            .select('title summary tags created_date')
            .populate({
                path: 'author',
                select: 'name'
            })
            .exec();
    };

    public getAllByTags = (
        tags: string[],
        containsAll: boolean
    ): Promise<IArticleModel | {}> => {
        const query = containsAll
            ? {
                  tags: { $all: tags }
              }
            : {
                  tags: { $in: tags }
              };

        return this.ArticleModel.find(query)
            .select('title summary tags created_date')
            .populate({
                path: 'author',
                select: 'name'
            })
            .exec();
    };

    public getAllByQuery = (query: string): Promise<IArticleModel | {}> => {
        return this.ArticleModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { summary: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        })
            .select('title summary tags created_date')
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
