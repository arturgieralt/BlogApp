require('dotenv').config();
import app from './setup/app';
import io from 'socket.io';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import CommentsController from './controllers/Comments/CommentsController';
import {
    userService,
    tokenService,
    commentService,
    envProvider,
    jwtModule
} from './setup/container';

const PORT = 3001;
const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, './config/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, './config/cert.pem'))
};

export const server = https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});

export const iot = io(server);

export const commentsController = new CommentsController(
    iot,
    userService,
    tokenService,
    commentService,
    envProvider,
    jwtModule
);
