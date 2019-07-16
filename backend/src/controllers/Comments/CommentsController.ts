import { Server, Socket } from 'socket.io';
import { ICommentSocket } from '../../dtos/ICommentSocket';
import { IUserService } from '../../services/User/IUserService';
import { ITokenService } from '../../services/TokenService/ITokenService';
import { ICommentService } from '../../services/Comment/ICommentService';
import { ICommentsController } from './ICommentsController';
import { IEnvProvider } from 'providers/EnvProvider/IEnvProvider';
import { IJWT } from 'types/externals';
import { IAddComment } from 'dtos/comment/IAddComment';

export default class CommentsController implements ICommentsController {
    public constructor(
        private server: Server,
        private UserService: IUserService,
        private TokenService: ITokenService,
        private CommentService: ICommentService,
        private EnvProvider: IEnvProvider,
        private JsonWebToken: IJWT
    ) {
        this.server
            .of('/commentStream')
            .use(this.verifyUser)
            .on('connection', this.onConnection);
    }

    private verifyToken = (socket: ICommentSocket, next: Function) => async (
        err: any,
        decoded: any
    ) => {
        if (!err) {
            const tokenEntry = await this.TokenService.getSingle(
                decoded.tokenId
            );

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
        if (
            commentSocket.handshake.query &&
            commentSocket.handshake.query.token
        ) {
            this.JsonWebToken.verify(
                commentSocket.handshake.query.token,
                this.EnvProvider.get('SECRET_JWT'),
                this.verifyToken(commentSocket, next)
            );
        } else {
            next(new Error('Authentication error'));
        }
    };

    private onMessage = ({
        articleId: roomID,
        decodedToken
    }: ICommentSocket) => async (message: string) => {
        const comment: IAddComment = {
            content: message
        };
        try {
            const comDoc = await this.CommentService.add(
                comment,
                roomID,
                decodedToken.id
            );
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
