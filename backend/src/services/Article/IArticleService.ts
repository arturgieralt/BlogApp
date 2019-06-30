import { IArticleModel } from 'models/Article/IArticleModel';
import { IFindArticleDto } from 'dtos/IFindArticle';

export interface IArticleService {
    get: (data: IFindArticleDto) => Promise<IArticleModel | {}>;
    getSingle: (id: string) => Promise<Record<string, any> | null>;
    update: (id: string, body: any) => Promise<IArticleModel | null>;
    add: (body: any, authorId: string) => Promise<IArticleModel>;
    remove: (id: string) => Promise<any>;
    getTagsCounted: () => Record<string, any>;
}
