import { IArticleWithId } from "models/Article/IArticleModel";
import mongoose from "mongoose";
import { IUserWithId } from "models/User/IUserModel";

export const userId = new mongoose.Types.ObjectId().toHexString();

export const usersSeed: IUserWithId[] = [
    {
        _id: userId,
        name: 'myUser',
        email: 'mymail@op.pl',
        isActive: true,
        passwordHash: 'dfsdfsdfsf',
        created_date: '2019-10-04T00:00:00.000Z',
        avatarUrl: 'dsfsdfs.jpg'
    }
]

export const articlesSeed: IArticleWithId[] = [
    {
        _id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Why tags are important',
        content: 'The content should be here.',
        summary: 'My summary',
        author: userId,
        tags: ['tag1', 'tag2'],
        commentsAllowed: true,
        created_date: '2019-10-04T00:00:00.000Z',
        last_updated: '2019-10-04T00:00:00.000Z'
    },
    {
        _id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Why tags are important',
        content: 'The content should be here.',
        summary: 'My summary',
        author: userId,
        tags: ['tag1', 'tag2'],
        commentsAllowed: true,
        created_date: '2019-10-04T00:00:00.000Z',
        last_updated: '2019-10-04T00:00:00.000Z'
    },
]
