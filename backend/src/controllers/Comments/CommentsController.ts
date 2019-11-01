import { Server, Socket } from 'socket.io';
import sanitize from 'sanitize-html';
import { ICommentSocket } from '../../dtos/ICommentSocket';
import { IUserService } from '../../services/User/IUserService';
import { ICommentService } from '../../services/Comment/ICommentService';
import { ICommentsController } from './ICommentsController';
import {
    addUser,
    removeUser,
    verifyUser,
    getUserID,
    getRoomID,
    validateRoomId
} from './helpers';
import { IUserModel } from 'models/User/IUserModel';
import { IComment } from 'models/Comment/ICommentModel';
import { IArticleService } from 'services/Article/IArticleService';

export const STREAM_NAME = '/commentStream';

export interface RoomUser {
    _id: string;
    name: string;
}
export interface RoomUsers {
    [key: string]: RoomUser[];
}

export const events = {
    connection: 'connection',
    status: 'status',
    message: 'message',
    error: 'error',
    success: 'success',
    roomUpdate: 'roomUpdate',
    disconnect: 'disconnect'
};

export default class CommentsController implements ICommentsController {
    public constructor(
        private server: Server,
        private UserService: IUserService,
        private CommentService: ICommentService,
        private ArticleService: IArticleService,
        private roomUsers: RoomUsers = {}
    ) {
        this.server
            .of(STREAM_NAME)
            .use(verifyUser)
            .use(validateRoomId)
            .use(this.checkIfArticleExists)
            .use(this.fetchUser)
            .on(events.connection, this.onConnection);
    }

    private checkIfArticleExists = async (socket: Socket, next: Function) => {
        try {
            const articleId = getRoomID(socket);
            const article = await this.ArticleService.getSingle(articleId);
            if(article !== null) {
                return next()
            }

            socket.disconnect()
            return next(new Error('No article with such ID in database'));
        } catch (e) {
            socket.disconnect()
            return next(e);
        }
    };


    private fetchUser = async (socket: Socket, next: Function) => {
        try {
            const userId = getUserID(socket);
            const user = await this.UserService.getSingle(userId);
            if(!user) {
                socket.disconnect();
                return next(new Error('No user with such ID in database'))
            }
            if(!user.isActive) {
                socket.disconnect();
                return next(new Error("User's account is not activated"))
            }

            (socket as any).user = user;
            return next();
        } catch (e) {
            socket.disconnect();
            return next(e);
        }
    };

    private onMessage = (socket: Socket) => async (message: string) => {
        const roomId = getRoomID(socket);
        const content = sanitize(message);
        try {
            const comment = await this.CommentService.add(
                content,
                roomId,
                (socket as any).user._id
            );
            this.emitComment(comment.toObject(), (socket as any).user, roomId);
        } catch (e) {
            this.emitError(e, socket);
        }
    };

    private onConnection = async (socket: Socket) => {
        socket.on(events.message, this.onMessage(socket as ICommentSocket));
        socket.on(
            events.disconnect,
            this.onDisconnect(socket as ICommentSocket)
        );

        try {
            const roomId = getRoomID(socket);
            socket.join(roomId);
            this.addUser(roomId, (socket as any).user);
            this.emitRoomUpdate(roomId);
        } catch (e) {
            this.emitError(e, socket);
        }
    };

    private onDisconnect = (socket: Socket) => () => {
        const roomId = getRoomID(socket);
        const userId = getUserID(socket);

        this.removeUser(roomId, userId);
        this.emitRoomUpdate(roomId);
    };

    private removeUser = (roomId: string, userId: string) => {
        this.roomUsers = removeUser(roomId, userId, { ...this.roomUsers });
    };

    private addUser = (roomId: string, user: IUserModel) => {
        this.roomUsers = addUser(
            roomId,
            {
                _id: user._id,
                name: user.name
            },
            { ...this.roomUsers }
        );
    };

    private emitComment = (
        comment: IComment,
        user: IUserModel,
        roomId: string
    ) => {
        const message = {
            ...comment,
            author: {
                _id: user._id,
                name: user.name
            }
        };

        this.server
            .of(STREAM_NAME)
            .to(roomId)
            .emit(events.success, message);
    };

    private emitError = (e: Error, socket: Socket) => {
        this.server
            .of(STREAM_NAME)
            .to(socket.id)
            .emit(events.error, { message: e.message });
    };

    private emitRoomUpdate = (roomId: string) => {
        this.server
            .of(STREAM_NAME)
            .to(roomId)
            .emit(events.roomUpdate, this.roomUsers[roomId]);
    };
}
