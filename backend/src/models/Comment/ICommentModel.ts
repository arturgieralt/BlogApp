import { Document } from 'mongoose';
import { IIdentity } from 'models/common/IIdentity';

export interface IComment {
    content: string;
    author: string;
    created_date: string;
    article: string;
    isRemoved: boolean;
}

export interface ICommentWithId extends IComment, IIdentity {}

export interface ICommentModel extends IComment, Document {}
