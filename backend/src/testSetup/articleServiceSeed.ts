import { IArticleWithId } from 'models/Article/IArticleModel';
import { IUserWithId } from 'models/User/IUserModel';

export const usersSeed: IUserWithId[] = [
    {
        _id: '5d1a44b66970a011ed25ca0e',
        name: 'myUser',
        email: 'mymail@op.pl',
        isActive: true,
        passwordHash:
            '$2b$10$8OiVS5MhDjTmXXiS24yGCeFdqcM3Za9rnM/qj8IR5oMv8w//IOFFe', // "passpass"
        created_date: '2019-10-04T00:00:00.000Z',
        avatarUrl: 'dsfsdfs.jpg',
        verificationCode: 'code',
        accountType: 'internal'
    }
];

export const articlesSeed: IArticleWithId[] = [
    {
        _id: '6d1a44b66970a011ed25ca0e',
        title: 'Why tags are important',
        content: 'It is important to use tags to make user be able to search..',
        summary: 'This is about tagging.',
        author: '5d1a44b66970a011ed25ca0e',
        tags: ['tag1', 'tag2'],
        commentsAllowed: true,
        created_date: '2019-10-04T00:00:00.000Z',
        last_updated: '2019-10-04T00:00:00.000Z'
    },
    {
        _id: '7d1a44b66970a011ed25ca0e',
        title: 'New way to code. Javascript is cool',
        content:
            'There are many patterns we can use in Javascript. TDD, observer pattern, bla bla bla .',
        summary: 'My summary',
        author: '5d1a44b66970a011ed25ca0e',
        tags: ['es6', 'tag2'],
        commentsAllowed: true,
        created_date: '2019-10-04T00:00:00.000Z',
        last_updated: '2019-10-04T00:00:00.000Z'
    },
    {
        _id: '9d1a44b66970a011ed25ca0e',
        title: 'What to do in the free time?',
        content:
            'You have more time than me? Than you can play tennis, games, football...',
        summary: 'About hobbies and activities',
        author: '5d1a44b66970a011ed25ca0e',
        tags: ['tag1', 'lifestyle'],
        commentsAllowed: false,
        created_date: '2019-10-04T00:00:00.000Z',
        last_updated: '2019-10-04T00:00:00.000Z'
    }
];
