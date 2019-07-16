import { Document } from 'mongoose';
import { IIdentity } from 'models/common/IIdentity';
import { IUserLiteWithId } from 'models/User/IUserModel';

export interface IArticleLite {
    title: string;
    summary: string;
    author: IUserLiteWithId;
    tags: string[];
    commentsAllowed: boolean;
    created_date: string;
}

export interface IArticleLiteWithId extends IArticleLite, IIdentity {}

export interface IArticle {
    title: string;
    content: string;
    summary: string;
    author: string;
    tags: string[];
    commentsAllowed: boolean;
    comments?: string[];
    created_date: string;
    last_updated: string;
}

export interface IArticleWithId extends IArticle, IIdentity {}

export interface IArticleModel extends IArticle, Document {}
