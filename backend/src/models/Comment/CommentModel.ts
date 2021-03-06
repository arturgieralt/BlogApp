import { Schema, model } from 'mongoose';
import { ICommentModel } from './ICommentModel';

export const CommentSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        content: { type: String, required: [true, 'Please provide a content'] },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        created_date: {
            type: Date,
            default: Date.now()
        },
        article: {
            type: Schema.Types.ObjectId,
            ref: 'Article',
            required: true
        },
        isRemoved: { type: Boolean, default: false }
    },
    { id: false }
);

CommentSchema.virtual('validContent').get(function(this: ICommentModel) {
    return this.isRemoved ? 'The comment was removed.' : this.content;
});

export const CommentModel = model<ICommentModel>(
    'Comment',
    CommentSchema,
    'comments'
);
