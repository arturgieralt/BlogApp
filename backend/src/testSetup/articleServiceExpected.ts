import { articlesSeed, usersSeed } from './articleServiceSeed';
import mongoose from 'mongoose';

export const expectedArticles = articlesSeed.map(el => ({
    tags: el.tags,
    created_date: new Date(el.created_date),
    _id: new mongoose.Types.ObjectId(el._id),
    title: el.title,
    summary: el.summary,
    author: {
        _id: new mongoose.Types.ObjectId(usersSeed[0]._id),
        name: usersSeed[0].name
    }
}));

export const expectedArticlesFull = articlesSeed.map(el => ({
    ...el,
    created_date: new Date(el.created_date),
    last_updated: new Date(el.last_updated),
    _id: new mongoose.Types.ObjectId(el._id),
    author: {
        _id: new mongoose.Types.ObjectId(usersSeed[0]._id),
        name: usersSeed[0].name
    }
}));
