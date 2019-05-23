import { Document } from "mongoose";

export interface ICommentModel extends Document {
    content: string;
    author: string;
    created_date: string;
    article: string;
}