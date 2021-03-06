import { ICommentWithId } from 'models/Comment/ICommentModel';
import { IArticleWithId } from 'models/Article/IArticleModel';
import { IUserWithId } from 'models/User/IUserModel';

export const usersSeed: IUserWithId[] = [
    {
        _id: '5d1a44b66970a011ed25ca0e',
        name: 'myUser',
        email: 'mymail@op.pl',
        isActive: true,
        passwordHash: 'dfsdfsdfsf',
        created_date: '2019-10-04T00:00:00.000Z',
        avatarUrl: 'dsfsdfs.jpg',
        verificationCode: 'code',
        accountType: 'internal'
    },
    {
        _id: '5d1a44b66970a011ed25ceee',
        name: 'myUser2',
        email: 'mymail2@op.pl',
        isActive: false,
        passwordHash: 'dfsdfsdfsf',
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
        commentsAllowed: false,
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
    }
];

export const commentsSeed: ICommentWithId[] = [
    {
        _id: '500a44b66970a011ed25ca0e',
        content: 'It is important to use tags to make user be able to search..',
        author: '5d1a44b66970a011ed25ca0e',
        isRemoved: true,
        article: '7d1a44b66970a011ed25ca0e',
        created_date: '2019-10-04T00:00:00.000Z'
    },
    {
        _id: '600a44b66970a011ed25ca0e',
        content: 'It is important to use tags to make user be able to search..',
        author: '5d1a44b66970a011ed25ca0e',
        isRemoved: false,
        article: '7d1a44b66970a011ed25ca0e',
        created_date: '2019-10-04T00:00:00.000Z'
    },
    {
        _id: '700a44b66970a011ed25ca0e',
        content: 'It is important to use tags to make user be able to search..',
        author: '5d1a44b66970a011ed25ca0e',
        isRemoved: false,
        article: '901a44b66970a011ed25ca0e',
        created_date: '2019-10-04T00:00:00.000Z'
    }
];
