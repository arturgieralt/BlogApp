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

describe('Login route:', () => {
    before(async () => {
        mongoServer = new MongoMemoryServer();
        const url = await mongoServer.getConnectionString();
        mongoose.connect(url, { useNewUrlParser: true });
        appBuilderClass = await appBuilder.build();
        await userModel.insertMany(usersSeed);
        app = appBuilderClass.app   
    });

    after(async () => {
         await mongoose.disconnect();
         await mongoServer.stop();
    });

        it('should return 503 code when mail is duplicated', (done) => {
            request(app)
           .post('/user/register')
           .send({
               name: 'user1111',
               email: 'mymail@op.pl',
               password: 'passpass'
           })
           .expect(503, {
            type: 'MongoError',
            message: 'E11000 duplicate key error dup key: { : \"mymail@op.pl\" }'
           }, done)
        });

        it('should return 200 code when login is correct', (done) => {
            request(app)
           .post('/user/register')
           .send({
               name: 'user',
               email: 'mymail2@op.pl',
               password: 'passpass'
           })
           .expect(503, {
            type: 'MongoError',
            message: 'User validation failed: name: Invalid length'
           }, done)
        });


        it('should return 200 code when login is correct', (done) => {
            request(app)
           .post('/user/register')
           .send({
               name: undefined,
               email: 'mymail2@##op.pl',
               password: 'passpass'
           })
           .expect(422, {
            "errors": [
                   {
                     "location": "body",
                     "msg": "Invalid value",
                     "param": "name",
                   },
                   {
                    "location": "body",
                    "msg": "Invalid value",
                    "param": "email",
                    "value": "mymail2@##op.pl"
                  }
                 ]
           }, done)
        });
});