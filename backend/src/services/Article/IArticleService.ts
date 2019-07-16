import {
    IArticleModel,
    IArticleWithId,
    IArticleLiteWithId
} from 'models/Article/IArticleModel';
import { IFindArticleDto } from 'dtos/article/IFindArticle';
import { ITag } from 'models/Tag/ITagModel';
import { IDeleteResultObject } from 'models/common/IDeleteResultObject';
import { IAddArticle } from 'dtos/article/IAddArticle';
import { IUpdateArticle } from 'dtos/article/IUpdateArticle';

export interface IArticleService {
    get: (data: IFindArticleDto) => Promise<IArticleLiteWithId[]>;
    getSingle: (id: string) => Promise<IArticleWithId | null>;
    update: (
        id: string,
        body: IUpdateArticle
    ) => Promise<IArticleWithId | null>;
    add: (body: IAddArticle, authorId: string) => Promise<IArticleModel>;
    remove: (id: string) => Promise<IDeleteResultObject>;
    getTagsCounted: () => Promise<ITag[]>;
}
