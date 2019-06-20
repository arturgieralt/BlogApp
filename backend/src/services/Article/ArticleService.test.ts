import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {ArticleModel} from './../../models/Article/ArticleModel';
import {UserModel} from '../../models/User/UserModel';
import ArticleService from './ArticleService';
import { usersSeed, articlesSeed } from './../../testSetup/articleServiceSeed';
import { expectedArticles } from './../../testSetup/articleServiceExpected';

let mongoServer: MongoMemoryServer;


describe('Article service', () => {
    before(async () => {
        mongoServer = new MongoMemoryServer();
        const url = await mongoServer.getConnectionString();
        mongoose.connect(url, { useNewUrlParser: true });
        await ArticleModel.insertMany(articlesSeed);
        await UserModel.insertMany(usersSeed);
        
    });

    after(() => {
        mongoose.disconnect();
        mongoServer.stop();
        });

    describe('getAll method', () => {
        it('should return all articles',async () => {
            const articleService = new ArticleService(ArticleModel);
            const articles = await articleService.getAll();
           
            expect(articles).to.deep.equal(expectedArticles);
        });
    });
});
