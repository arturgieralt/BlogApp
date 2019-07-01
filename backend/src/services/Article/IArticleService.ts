import {
    IArticleModel,
    IArticleWithId,
    IArticleLiteWithId
} from 'models/Article/IArticleModel';
import { IFindArticleDto } from 'dtos/article/IFindArticle';
import { ITag } from 'models/Tag/ITagModel';

export interface IArticleService {
    get: (data: IFindArticleDto) => Promise<IArticleLiteWithId[]>;
    getSingle: (id: string) => Promise<IArticleWithId | null>;
    update: (id: string, body: any) => Promise<IArticleWithId | null>;
    add: (body: any, authorId: string) => Promise<IArticleModel>;
    remove: (id: string) => Promise<any>;
    getTagsCounted: () => Promise<ITag[]>;
}
