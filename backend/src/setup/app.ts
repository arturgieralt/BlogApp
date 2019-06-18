import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';

import * as bodyParser from 'body-parser';
import { Routes } from './routes';
import mongoose from 'mongoose';
import passport = require('passport');
import { initPassport } from './passportSetup';
import cors from 'cors';
import path from 'path';
import {
    articlesController,
    usersController,
    filesController,
    captchaController,
    authorizeMiddleware,
    verifyUserMiddleware,
    envProvider
} from './container';

class App {
    public app: express.Application;
    public routing: Routes = new Routes();
    private mongoUrl: string = envProvider.get('DB_CONNECTION_STRING');

    public constructor() {
        this.app = express();
        this.config();
        this.routing.routes(
            this.app,
            articlesController,
            usersController,
            filesController,
            captchaController,
            authorizeMiddleware
        );
        this.mongoSetup();
    }

    private config() {
        const corsOptions = {
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        };

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors(corsOptions));
        this.app.use(passport.initialize());
        initPassport(verifyUserMiddleware, envProvider);
        this.app.use(
            '/avatars',
            express.static(path.dirname(__dirname) + '/backend/uploads') /// change this!!
        );
    }

    private async mongoSetup(): Promise<void> {
        mongoose.Promise = global.Promise;

        const mode = envProvider.get('DB_MODE');
        let url;
        if (mode === 'INMEMORY') {
            const mongod = new MongoMemoryServer();
            url = await mongod.getConnectionString();
        } else {
            url = this.mongoUrl;
        }

        mongoose.connect(url, { useNewUrlParser: true }, e => {
            if (e) {
                return console.log('ERROR' + e);
            }
            return console.log('Connected to Mongo');
        });
    }
}

export default new App().app;
