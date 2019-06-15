import { IArticleModel } from 'models/Article/IArticleModel';

export interface IArticleService {
    getAll: () => Promise<IArticleModel | {}>;
    getSingle: (id: string) => Promise<Record<string, any> | null>;
    update: (id: string, body: any) => Promise<IArticleModel | null>;
    add: (body: any, authorId: string) => Promise<IArticleModel>;
    remove: (id: string) => Promise<any>;
    getTagsCounted: () => Record<string, any>;
    getAllByTags: (
        tags: string[],
        containsAll: boolean
    ) => Promise<IArticleModel | {}>;
    getAllByQuery: (query: string) => Promise<IArticleModel | {}>;
}
