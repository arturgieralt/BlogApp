require('dotenv').config();
import app from './app';
import io from 'socket.io';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import jwt from 'jsonwebtoken';
import { add } from './services/CommentService';

const PORT = 3001;
const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, './config/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, './config/cert.pem'))
};

const server =  https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});

const iot = io(server);

iot
.of('/commentStream')
.use(function(socket, next){
  if (socket.handshake.query && socket.handshake.query.token){
    jwt.verify(socket.handshake.query.token, process.env.SECRET_JWT as string, function(err: any, decoded: any) {
      if(!err) {
        (socket as any).decodedToken = {...decoded};
        (socket as any).articleId = socket.handshake.query.articleId;
        return next();
      }
      next(new Error('Authentication error'));
      
    });
  } else {
      next(new Error('Authentication error'));
  }    
})
.on('connection', function(socket) {
    // Connection now authenticated to receive further events

    const roomID = (socket as any).articleId;
    socket.join(roomID);
    socket.on('message', function(message) {

      add({
        content: message,
        author: (socket as any).decodedToken.id,
        article: roomID
      });

        iot
        .of('/commentStream')
        .to(roomID)
        .emit('new comment', message + 'from '+ (socket as any).decodedToken.name);
    });
});

