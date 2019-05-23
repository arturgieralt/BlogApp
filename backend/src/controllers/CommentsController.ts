import jwt from 'jsonwebtoken';
import * as commentService from './../services/CommentService';
import { Server, Socket } from 'socket.io';
import TokenServiceInstance from './../services/TokenService/TokenService';
import { ICommentSocket } from 'dtos/ICommentSocket';
import { UserService } from 'services/UserService';

export class CommentsController {
  constructor(private server: Server, private UserServiceInstance: UserService){

    this.server
      .of('/commentStream')
      .use(this.verifyUser)
      .on('connection', this.onConnection(this.server) );

  }

    verifyUser = (socket: Socket, next: Function) => {
      const commentSocket = socket as ICommentSocket;
      if (commentSocket.handshake.query && commentSocket.handshake.query.token){
        jwt.verify(commentSocket.handshake.query.token, process.env.SECRET_JWT as string, async function(err: any, decoded: any) {
          if(!err) {
            const tokenEntry = await TokenServiceInstance.getSingle((decoded as any).tokenId)

            if( tokenEntry && (tokenEntry as any).isActive) {
              commentSocket.decodedToken = {...decoded};
              commentSocket.articleId = commentSocket.handshake.query.articleId;
              return next();
            }
          } else {
            commentSocket.disconnect();
            next(new Error('Authentication error'));
          }
          
          
        });
      } else {
          next(new Error('Authentication error'));
      }    
    }

    onConnection = (server: Server) => (socket: Socket) => {
      // Connection now authenticated to receive further events

      const UserService = this.UserServiceInstance;
      const roomID = (socket as any).articleId;
      socket.join(roomID);
      socket.on('message', async function(message) {

      const comment = {
        content: message,
        author: (socket as any).decodedToken.id,
        article: roomID
      };
      try{
        const comDoc = await commentService.add(comment)
        const com = comDoc.toObject()
        const user = await UserService.getSingle(com.author)
        server
        .of('/commentStream')
        .to(roomID)
        .emit('new comment', { 
          ...com, 
          author: {
            _id: com.author,
            name: user.name
          }
        });
      } catch(e) {
        server
        .of('/commentStream')
        .to(roomID)
        .emit('comment save fail', e);
      }
  })
}
}
