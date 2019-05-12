import jwt from 'jsonwebtoken';
import * as commentService from './../services/CommentService';
import { Server, Socket } from 'socket.io';
import TokenServiceInstance from './../services/TokenService/TokenService';

export class CommentsController {
  constructor(private server: Server){

    this.server
      .of('/commentStream')
      .use(this.verifyUser)
      .on('connection', this.onConnection(this.server) );

  }

        verifyUser = (socket: Socket, next: Function) => {
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
        }

        onConnection = (server: Server) => (socket: Socket) => {
          // Connection now authenticated to receive further events

          const roomID = (socket as any).articleId;
          socket.join(roomID);
          socket.on('message', function(message) {

          const comment = {
            content: message,
            author: (socket as any).decodedToken.id,
            article: roomID
          };

          commentService.add(comment)
          .then(comDoc => {
            const com = comDoc.toObject()
            server
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
            server
              .of('/commentStream')
              .to(roomID)
              .emit('comment save fail', e);
            });
          });
      }
}
