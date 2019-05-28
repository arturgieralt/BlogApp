import { IArticleModel } from "models/Article/IArticleModel";

export interface IArticleService {
    getAll: () => Promise<IArticleModel | {}>;
    getSingle: (id: string) => Promise<Object | null>;
    update:(id: string, body: any) => Promise<IArticleModel | null>;
    add: (body: any) => Promise<IArticleModel>;
    remove: (id: string) => Promise<any>;
}