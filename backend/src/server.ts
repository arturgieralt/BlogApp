require('dotenv').config();
import app from './app';
import io from 'socket.io';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import jwt from 'jsonwebtoken';
import { add } from './services/CommentService';
import TokenServiceInstance from './services/TokenService/TokenService';

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
    jwt.verify(socket.handshake.query.token, process.env.SECRET_JWT as string, async function(err: any, decoded: any) {
      if(!err) {
        const tokenEntry = await TokenServiceInstance.getSingle((decoded as any).tokenId)

        if( tokenEntry && (tokenEntry as any).isActive) {
          (socket as any).decodedToken = {...decoded};
          (socket as any).articleId = socket.handshake.query.articleId;
          return next();
        }
      } else {
        socket.disconnect();
        next(new Error('Authentication error'));
      }
      
      
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

    const comment = {
      content: message,
      author: (socket as any).decodedToken.id,
      article: roomID
    };

    add(comment)
    .then(comDoc => {
      const com = comDoc.toObject()
      iot
      .of('/commentStream')
      .to(roomID)
      .emit('new comment', { 
        ...com, 
        author: {
          _id: com.author,
          name: (socket as any).decodedToken.name
        }
      });
    })
    .catch(e => {
      iot
        .of('/commentStream')
        .to(roomID)
        .emit('comment save fail', e);
      });
    });
});

