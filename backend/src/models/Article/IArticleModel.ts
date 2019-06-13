import { Document } from 'mongoose';

export interface IArticleModel extends Document {
    title: string;
    content: string;
    summary: string;
    author: string;
    tags: string[];
    commentsAllowed: boolean;
    comments: string[];
    created_date: string;
    last_updated: string;
}
