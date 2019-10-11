import express, { RequestHandler } from 'express';

import * as bodyParser from 'body-parser';
import { Routes } from './routes';
import passport = require('passport');
import { initPassport } from './passportSetup';
import session from 'express-session';

import cors from 'cors';
import path from 'path';
import {
    articlesController,
    usersController,
    filesController,
    captchaController,
    authorizeMiddleware,
    verifyUserMiddleware,
    envProvider,
    fileUploaderMiddleware,
    identityController,
    userService
} from './container';
import errorHandler from './../middlewares/ErrorHandler/ErrorHandler';
import errorLogger from './../middlewares/loggers/ErrorLogger';
import requestLogger from './../middlewares/loggers/RequestLogger';

class App {
    public app: express.Application;
    public routing: Routes = new Routes();
    public session: RequestHandler;
    public constructor() {
        this.app = express();
        this.session = this.createSessionMiddleware();
    }

    public async build(): Promise<App> {
        this.config();
        this.routing.routes(
            this.app,
            articlesController,
            usersController,
            filesController,
            captchaController,
            authorizeMiddleware,
            fileUploaderMiddleware,
            identityController
        );

        this.app.use(errorLogger);

        this.app.use(errorHandler);

        return this;
    }

    private createSessionMiddleware(): RequestHandler {
        const mode = envProvider.get('DB_MODE');

        if (mode === 'INMEMORY' || process.env.NODE_ENV === 'test') {
            return session({
                secret: 'keyboard cat',
                resave: false,
                cookie: { secure: false, maxAge: 1209600000 },
                saveUninitialized: false
            });
        } else {
            const connectRedis = require('connect-redis');
            const RedisStore = connectRedis(session);
            const store = new RedisStore({});
            return session({
                store,
                secret: 'keyboard cat',
                resave: false,
                cookie: { secure: false, maxAge: 1209600000 },
                saveUninitialized: false
            });
        }
    }

    private config() {
        const corsOptions = {
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
            credentials: true
        };

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors(corsOptions));

        this.app.use(this.session);

        this.app.use(passport.initialize());
        this.app.use(passport.session());
        initPassport(verifyUserMiddleware, userService);

        this.app.use(
            '/avatars',
            express.static(path.dirname(__dirname) + '/uploads') /// change this!!
        );

        this.app.use(requestLogger);
    }
}

export default new App();
