import {Schema, model} from 'mongoose';

 export const ArticleSchema = new Schema({
     title: {
         type: String,
         required: 'Enter a title'
     },
     content: {
        type: String,
        required: 'Enter a content'
     },
    author: {
        type: String,
        required: true        
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
 });

 export const ArticleModel = model('Article', ArticleSchema, 'articles');