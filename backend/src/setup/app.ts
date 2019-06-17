import express from 'express';
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
            express.static(path.dirname(__dirname) + '/uploads')
        );
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true }, e => {
            if (e) {
                console.log('ERROR' + e);
            }
            console.log('Connected to Mongo');
        });
    }
}

export default new App().app;
