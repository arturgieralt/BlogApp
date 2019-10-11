import { Server, Socket } from 'socket.io';
import sanitize from 'sanitize-html';
import { ICommentSocket } from '../../dtos/ICommentSocket';
import { IUserService } from '../../services/User/IUserService';
import { ICommentService } from '../../services/Comment/ICommentService';
import { ICommentsController } from './ICommentsController';
import { IAddComment } from 'dtos/comment/IAddComment';
import { addUser, removeUser } from './helpers';

export interface RoomUser {
    _id: string;
    name: string;
}
export interface RoomUsers {
    [key: string]: RoomUser[];
}

export default class CommentsController implements ICommentsController {
    public constructor(
        private server: Server,
        private UserService: IUserService,
        private CommentService: ICommentService,
        private roomUsers: RoomUsers = {}
    ) {
        this.server
            .of('/commentStream')
            .use(this.verifyUser)
            .on('connection', this.onConnection);
    }

    // private verifyToken = (socket: ICommentSocket, next: Function) => async (
    //     err: any,
    //     decoded: any
    // ) => {
    //     if (!err) {
    //         const tokenEntry = await this.TokenService.getSingle(
    //             decoded.tokenId
    //         );

    //         if (tokenEntry && tokenEntry.isActive) {
    //             socket.decodedToken = { ...decoded };
    //             socket.articleId = socket.handshake.query.articleId;
    //             return next();
    //         }
    //     } else {
    //         socket.disconnect();
    //         next(new Error('Authentication error'));
    //     }
    // };

    private verifyUser = (socket: Socket, next: Function) => {
        if (socket.request.session.passport) {
            (socket as ICommentSocket).articleId =
                socket.handshake.query.articleId;
            return next();
        } else {
            socket.disconnect();
            next(new Error('Authentication error'));
        }
    };

    private onMessage = (socket: Socket) => async (message: string) => {
        const comment: IAddComment = {
            content: sanitize(message)
        };
        const roomId = (socket as ICommentSocket).articleId;
        const userId = socket.request.session.passport.user;

        try {
            const comDoc = await this.CommentService.add(
                comment,
                roomId,
                userId
            );
            const com = comDoc.toObject();
            const user = await this.UserService.getSingle(userId);
            const message = {
                ...com,
                author: {
                    _id: userId,
                    name: user.name
                }
            };

            this.server
                .of('/commentStream')
                .to(roomId)
                .emit('new comment', message);
        } catch (e) {
            this.server
                .of('/commentStream')
                .to(roomId)
                .emit('comment save fail', e);
        }
    };

    private onConnection = async (socket: Socket) => {
        const roomID = (socket as ICommentSocket).articleId;
        const userId = socket.request.session.passport.user;

        const user = await this.UserService.getSingle(userId);

        socket.join(roomID);
        this.roomUsers = addUser(
            roomID,
            {
                _id: userId,
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
        const userId = socket.request.session.passport.user;

        this.roomUsers = removeUser(roomID, userId, { ...this.roomUsers });

        this.server
            .of('/commentStream')
            .to(roomID)
            .emit('roomUpdate', this.roomUsers[roomID]);
    };
}
