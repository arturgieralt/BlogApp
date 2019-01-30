import {Schema, model} from 'mongoose';

 export const CommentSchema = new Schema({
     _id: Schema.Types.ObjectId,
     content: {type: String, required: [true, 'Please provide a content']},
     author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
     created_date: {
        type: Date,
        default: Date.now()
    },
    article: {type: Schema.Types.ObjectId, ref: 'Article', required: true}
 });

 export const CommentModel = model('Comment', CommentSchema, 'comments');