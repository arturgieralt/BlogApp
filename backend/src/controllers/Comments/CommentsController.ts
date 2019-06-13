import jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';
import { ICommentSocket } from '../../dtos/ICommentSocket';
import { IUserService } from '../../services/User/IUserService';
import { ITokenService } from '../../services/TokenService/ITokenService';
import { ICommentService } from '../../services/Comment/ICommentService';
import { ICommentsController } from './ICommentsController';

export default class CommentsController implements ICommentsController {
    public constructor(
        private server: Server,
        private UserService: IUserService,
        private TokenService: ITokenService,
        private CommentService: ICommentService
    ) {
        this.server
            .of('/commentStream')
            .use(this.verifyUser)
            .on('connection', this.onConnection);
    }

    private verifyToken = (socket: ICommentSocket, next: Function) => async (err: any, decoded: any) => {
        if (!err) {
            const tokenEntry = await this.TokenService.getSingle(decoded.tokenId);

            if (tokenEntry && tokenEntry.isActive) {
                socket.decodedToken = { ...decoded };
                socket.articleId = socket.handshake.query.articleId;
                return next();
            }
        } else {
            socket.disconnect();
            next(new Error('Authentication error'));
        }
    };

    private verifyUser = (socket: Socket, next: Function) => {
        const commentSocket = socket as ICommentSocket;
        if (commentSocket.handshake.query && commentSocket.handshake.query.token) {
            jwt.verify(
                commentSocket.handshake.query.token,
                process.env.SECRET_JWT as string,
                this.verifyToken(commentSocket, next)
            );
        } else {
            next(new Error('Authentication error'));
        }
    };

    private onMessage = ({ articleId: roomID, decodedToken }: ICommentSocket) => async (message: string) => {
        const comment = {
            content: message,
            author: decodedToken.id,
            article: roomID
        };
        try {
            const comDoc = await this.CommentService.add(comment);
            const com = comDoc.toObject();
            const user = await this.UserService.getSingle(com.author);
            this.server
                .of('/commentStream')
                .to(roomID)
                .emit('new comment', {
                    ...com,
                    author: {
                        _id: com.author,
                        name: user.name
                    }
                });
        } catch (e) {
            this.server
                .of('/commentStream')
                .to(roomID)
                .emit('comment save fail', e);
        }
    };

    private onConnection = (socket: Socket) => {
        const roomID = (socket as ICommentSocket).articleId;
        socket.join(roomID);
        socket.on('message', this.onMessage(socket as ICommentSocket));
    };
}
