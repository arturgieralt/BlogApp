import express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes';
import mongoose from 'mongoose';
import passport = require('passport');
import { initPassport } from './passportSetup';
import cors from 'cors';
import path from 'path';
import { articlesController, usersController, filesController, captchaController, authorizeMiddleware, verifyUserMiddleware } from './container';

class App {
  public app: express.Application;
  public routing: Routes = new Routes();
  private mongoUrl: string = process.env.DB_CONNECTION_STRING as string;

  constructor() {
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
    initPassport(verifyUserMiddleware);
    this.app.use('/avatars', express.static(path.dirname(__dirname) + '/uploads'));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  }
}

export default new App().app;
