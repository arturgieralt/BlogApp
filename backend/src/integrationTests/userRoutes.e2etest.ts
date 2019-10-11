require('dotenv').config();
import mongoose from 'mongoose';
import appBuilder from '../setup/app';
import request from 'supertest';
import { usersSeed } from '../testSetup/articleServiceSeed';
import { userModel } from '../setup/container';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;
let app: Express.Application | null;
let appBuilderClass: any;

describe('Article service getters:', () => {
    before(async () => {
        mongoServer = new MongoMemoryServer();
        const url = await mongoServer.getConnectionString();
        mongoose.connect(url, { useNewUrlParser: true });
        appBuilderClass = await appBuilder.build();
        app = appBuilderClass.app;
        await userModel.insertMany(usersSeed);
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('should return 200 code when login is correct', done => {
        request(app)
            .post('/user/login')
            .send({
                email: 'mymail@op.pl',
                password: 'passpass'
            })
            .expect(200, done);
    });

    it('should return 422 code when email is not correct', done => {
        request(app)
            .post('/user/login')
            .send({
                email: 'notamail',
                password: 'passpass'
            })
            .expect(422, done);
    });

    it('should return 422 code when email is not correct', done => {
        request(app)
            .post('/user/login')
            .send({
                email: 'notamail',
                password: undefined
            })
            .expect(422, done);
    });

    it('should return 500 code when login is incorrect', done => {
        request(app)
            .post('/user/login')
            .send({
                email: 'mymail@op.pl',
                password: 'wrongpass'
            })
            .expect(500, done);
    });
});
