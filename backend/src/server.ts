require('dotenv').config();
import app from './setup/app';
import io from 'socket.io';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import CommentsController from './controllers/Comments/CommentsController';
import {
    userService,
    commentService,
    envProvider,
} from './setup/container';
import setupDb from './setup/db';
import { ICommentsController } from 'controllers/Comments/ICommentsController';
import { Response } from 'express';

const PORT = 3001;
const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, './config/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, './config/cert.pem'))
};

export let server: any;
export let iot: SocketIO.Server;
export let commentsController: ICommentsController;

setupDb(envProvider);
app.build().then(express => {
     server = https.createServer(httpsOptions, express.app ).listen(PORT, () => {
        console.log('Express server listening on port ' + PORT);
    });
    
    iot  = io(server);

    iot.use((socket, next) => {
        app.session(socket.request, {} as Response, next)
    });
    
    commentsController = new CommentsController(
        iot,
        userService,
        commentService
    );
})

