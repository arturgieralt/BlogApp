import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserModel } from '../../models/User/UserModel';
import { ArticleModel } from '../../models/Article/ArticleModel';
import {
    articlesSeed,
    commentsSeed,
    usersSeed
} from '../../testSetup/commentServiceSeed';
import { CommentModel } from '../../models/Comment/CommentModel';
import CommentService from './CommentService';
import { commentsExpected } from '../../testSetup/commentServiceExpected';
import { IAddComment } from 'dtos/comment/IAddComment';
import { IUpdateComment } from 'dtos/comment/IUpdateComment';

let mongoServer: MongoMemoryServer;

describe('Comments service service:', () => {
    before(async () => {
        mongoServer = new MongoMemoryServer();
        const url = await mongoServer.getConnectionString();
        mongoose.connect(url, { useNewUrlParser: true });
        await UserModel.insertMany(usersSeed);
        await ArticleModel.insertMany(articlesSeed);
        await CommentModel.insertMany(commentsSeed);
    });

    after(() => {
        mongoose.disconnect();
        mongoServer.stop();
    });

    describe('get comments', () => {
        it('should return array with comments for article', async () => {
            const commentService = new CommentService(CommentModel);
            const comments = await commentService.get(
                '7d1a44b66970a011ed25ca0e'
            );

            expect(comments).to.deep.equal([
                commentsExpected[0],
                commentsExpected[1]
            ]);
        });

        it('should return array with all comments', async () => {
            const commentService = new CommentService(CommentModel);
            const comments = await commentService.get();

            expect(comments).to.deep.equal(commentsExpected);
        });
    });

    describe('add comments', () => {
        it('should add new comment', async () => {
            const commentService = new CommentService(CommentModel);
            const body: IAddComment = {
                content: 'My new comment'
            };
            const comment = await commentService.add(
                body,
                '6d1a44b66970a011ed25ca0e',
                '5d1a44b66970a011ed25ca0e'
            );

            expect(comment.toObject()).to.deep.include(body);
        });
    });

    describe('update comments', () => {
        it('should update comment when id is correct', async () => {
            const commentService = new CommentService(CommentModel);

            const body: IUpdateComment = {
                content: 'Content changed'
            };

            const comment = await commentService.update(
                '600a44b66970a011ed25ca0e',
                body
            );

            expect(comment).to.deep.include(body);
        });

        it('should return null when id is not correct', async () => {
            const commentService = new CommentService(CommentModel);

            const body: IUpdateComment = {
                content: 'Content changed'
            };

            const comment = await commentService.update(
                '000a44b66970a011ed25ca0e',
                body
            );

            expect(comment).to.be.equal(null);
        });
    });
});
