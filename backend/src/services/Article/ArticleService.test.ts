import mongoose from 'mongoose';
import { expect } from 'chai';
import forEach from 'mocha-each';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ArticleModel } from './../../models/Article/ArticleModel';
import { UserModel } from '../../models/User/UserModel';
import ArticleService from './ArticleService';
import { usersSeed, articlesSeed } from './../../testSetup/articleServiceSeed';
import { expectedArticles } from './../../testSetup/articleServiceExpected';

let mongoServer: MongoMemoryServer;

describe('Article service', () => {
    beforeEach(async () => {
        mongoServer = new MongoMemoryServer();
        const url = await mongoServer.getConnectionString();
        mongoose.connect(url, { useNewUrlParser: true });
        await ArticleModel.insertMany(articlesSeed);
        await UserModel.insertMany(usersSeed);
    });

    afterEach(() => {
        mongoose.disconnect();
        mongoServer.stop();
    });

    describe('get method with empty data object', () => {
        it('should return all articles', async () => {
            const articleService = new ArticleService(ArticleModel);
            const articles = await articleService.get({});

            expect(articles).to.deep.equal(expectedArticles);
        });
    });

    describe('get method used with tags', () => {
        it('should return all articles for specific tag', async () => {
            const articleService = new ArticleService(ArticleModel);
            const articles = await articleService.get({tags: ['tag1']});

            expect(articles).to.deep.equal([expectedArticles[0], expectedArticles[2]]);
        });

        it('should return all articles for specific tags and flag containsAll set to false', async () => {
            const articleService = new ArticleService(ArticleModel);
            const articles = await articleService.get({tags: ['es6', 'lifestyle' ]});

            expect(articles).to.deep.equal([expectedArticles[1], expectedArticles[2]]);
        });

        it('should return no articles for specific tags and flag containsAll set to true', async () => {
            const articleService = new ArticleService(ArticleModel);
            const articles = await articleService.get({tags: ['es6', 'lifestyle' ], containsAll: true});

            expect(articles).to.deep.equal([]);
        });

        it('should return article for specific tags and flag containsAll set to true', async () => {
            const articleService = new ArticleService(ArticleModel);
            const articles = await articleService.get({tags: ['es6', 'tag2' ], containsAll: true});

            expect(articles).to.deep.equal([expectedArticles[1]]);
        });
    });

    describe('get method provided with query', () => {

        forEach([
            ['Javascript', [expectedArticles[1]]],
            ['hobbies', [expectedArticles[2]]],
            ['tennis', [expectedArticles[2]]],
            ['tagging', [expectedArticles[0]]],
            ['tags', [expectedArticles[0]]],
            ['in the free', [expectedArticles[2]]],
            ['My summary', [expectedArticles[1]]],
            ['are many patte', [expectedArticles[1]]]
        ]).it(
            'when query is %s it returns proper data set',
            async (query, expectedResult) => {
                const articleService = new ArticleService(ArticleModel);
                const articles = await articleService.get({query});
    
                expect(articles).to.deep.equal(expectedResult);
            }
        );
    });


    describe('get method with tags and query params', () => {
        it('should return proper data set', async () => {
            const articleService = new ArticleService(ArticleModel);
            const articles = await articleService.get({tags: ['es6', 'lifestyle' ], query: 'My Summary'});

            expect(articles).to.deep.equal([expectedArticles[1]]);
        });
    });
});
