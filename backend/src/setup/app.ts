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
    envProvider,
    fileUploaderMiddleware
} from './container';
import errorHandler from './../middlewares/ErrorHandler/ErrorHandler';
import winston from 'winston';
import expressWinston from 'express-winston';

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
            authorizeMiddleware,
            fileUploaderMiddleware
        );

        this.app.use(expressWinston.errorLogger({
            transports: [
              new winston.transports.File({
                  filename: 'errors.log'
              })
            ],
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.json()
            )
          }));

        this.app.use(errorHandler);

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
            express.static(path.dirname(__dirname) + '/uploads') /// change this!!
        );

        this.app.use(expressWinston.logger({
            transports: [
              new winston.transports.File({
                  filename: 'requests.log'
              })
            ],
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.json()
            ),
            meta: true, // optional: control whether you want to log the meta data about the request (default to true)
            msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
            expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
            colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
            ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
          }));
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
