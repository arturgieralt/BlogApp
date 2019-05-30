import { IArticleModel } from "models/Article/IArticleModel";

export interface IArticleService {
    getAll: () => Promise<IArticleModel | {}>;
    getSingle: (id: string) => Promise<Object | null>;
    update:(id: string, body: any) => Promise<IArticleModel | null>;
    add: (body: any, authorId: string) => Promise<IArticleModel>;
    remove: (id: string) => Promise<any>;
    getTagsCounted: () => Object;
    getAllByTags: (tags: string[], containsAll: boolean) => Promise<IArticleModel | {}>;
}