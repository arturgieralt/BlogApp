import express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes';
import mongoose from 'mongoose';

class App {
  public app: express.Application;
  public routing: Routes = new Routes();
  private mongoUrl: string = process.env.DB_CONNECTION_STRING as string;

  constructor() {
    this.app = express();
    this.config();
    this.routing.routes(this.app);
    this.mongoSetup();
  }

  private config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  }
}

export default new App().app;
