import { ICommentModel, ICommentWithId } from 'models/Comment/ICommentModel';
import { IAddComment } from 'dtos/comment/IAddComment';
import { IUpdateComment } from 'dtos/comment/IUpdateComment';

export interface ICommentService {
    get: (id?: string) => Promise<ICommentWithId[]>;
    update: (
        id: string,
        body: IUpdateComment
    ) => Promise<ICommentWithId | null>;
    add: (
        content: string,
        articleId: string,
        authorId: string
    ) => Promise<ICommentModel>;
}
