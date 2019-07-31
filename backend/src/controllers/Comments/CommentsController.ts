import { Server, Socket } from 'socket.io';
import sanitize from 'sanitize-html'
import { ICommentSocket } from '../../dtos/ICommentSocket';
import { IUserService } from '../../services/User/IUserService';
import { ITokenService } from '../../services/TokenService/ITokenService';
import { ICommentService } from '../../services/Comment/ICommentService';
import { ICommentsController } from './ICommentsController';
import { IEnvProvider } from 'providers/EnvProvider/IEnvProvider';
import { IJWT } from 'types/externals';
import { IAddComment } from 'dtos/comment/IAddComment';
import { addUser, removeUser } from './helpers';

export type RoomUser = {
    _id: string;
    name: string;
};
export type RoomUsers = {
    [key: string]: RoomUser[];
};

export default class CommentsController implements ICommentsController {
    public constructor(
        private server: Server,
        private UserService: IUserService,
        private TokenService: ITokenService,
        private CommentService: ICommentService,
        private EnvProvider: IEnvProvider,
        private JsonWebToken: IJWT,
        private roomUsers: RoomUsers = {}
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
            content: sanitize(message)
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

    private onConnection = async (socket: Socket) => {
        const roomID = (socket as ICommentSocket).articleId;
        const token = (socket as ICommentSocket).decodedToken;

        const user = await this.UserService.getSingle(token.id);

        socket.join(roomID);
        this.roomUsers = addUser(
            roomID,
            {
                _id: token.id,
                name: user.name
            },
            { ...this.roomUsers }
        );

        socket.on('message', this.onMessage(socket as ICommentSocket));
        socket.on('disconnect', this.onDisconnect(socket as ICommentSocket));

        this.server
            .of('/commentStream')
            .to(roomID)
            .emit('roomUpdate', this.roomUsers[roomID]);
    };

    private onDisconnect = (socket: Socket) => () => {
        const roomID = (socket as ICommentSocket).articleId;
        const token = (socket as ICommentSocket).decodedToken;

        this.roomUsers = removeUser(roomID, token.id, { ...this.roomUsers });

        this.server
            .of('/commentStream')
            .to(roomID)
            .emit('roomUpdate', this.roomUsers[roomID]);
    };
}
