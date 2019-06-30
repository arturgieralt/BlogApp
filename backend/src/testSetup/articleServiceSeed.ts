import { IArticleWithId } from 'models/Article/IArticleModel';
import mongoose from 'mongoose';
import { IUserWithId } from 'models/User/IUserModel';

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
];

export const articlesSeed: IArticleWithId[] = [
    {
        _id: new mongoose.Types.ObjectId().toHexString(),
        title: 'Why tags are important',
        content: 'It is important to use tags to make user be able to search..',
        summary: 'This is about tagging.',
        author: userId,
        tags: ['tag1', 'tag2'],
        commentsAllowed: true,
        created_date: '2019-10-04T00:00:00.000Z',
        last_updated: '2019-10-04T00:00:00.000Z'
    },
    {
        _id: new mongoose.Types.ObjectId().toHexString(),
        title: 'New way to code. Javascript is cool',
        content: 'There are many patterns we can use in Javascript. TDD, observer pattern, bla bla bla .',
        summary: 'My summary',
        author: userId,
        tags: ['es6', 'tag2'],
        commentsAllowed: true,
        created_date: '2019-10-04T00:00:00.000Z',
        last_updated: '2019-10-04T00:00:00.000Z'
    },
    {
        _id: new mongoose.Types.ObjectId().toHexString(),
        title: 'What to do in the free time?',
        content: 'You have more time than me? Than you can play tennis, games, football...',
        summary: 'About hobbies and activities',
        author: userId,
        tags: ['tag1', 'lifestyle'],
        commentsAllowed: false,
        created_date: '2019-10-04T00:00:00.000Z',
        last_updated: '2019-10-04T00:00:00.000Z'
    }
];
