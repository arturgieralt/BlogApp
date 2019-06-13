import { ICommentModel } from 'models/Comment/ICommentModel';

export interface ICommentService {
    getAll: () => Promise<ICommentModel | {}>;
    getAllForArticle: (id: string) => Promise<ICommentModel[]>;
    getSingle: (id: string) => Promise<ICommentModel | null>;
    update: (id: string, body: any) => Promise<ICommentModel | null>;
    add: (body: any) => Promise<ICommentModel>;
    remove: (id: string) => Promise<any>;
}
