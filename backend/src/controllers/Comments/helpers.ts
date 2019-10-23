import { RoomUser, RoomUsers } from './CommentsController';
import { Socket } from 'socket.io';
import { Types } from 'mongoose';

export const removeUser = (
    roomId: string,
    id: string,
    users: RoomUsers
): RoomUsers => {
    if (users[roomId] === undefined) {
        return users;
    }

    return {
        ...users,
        [roomId]: users[roomId].filter((u: RoomUser) => u._id !== id)
    };
};

export const addUser = (
    roomId: string,
    user: RoomUser,
    users: RoomUsers
): RoomUsers => {
    if (users[roomId] === undefined) {
        return {
            ...users,
            [roomId]: [user]
        };
    }

    const isInRoom = users[roomId].some(u => u._id === user._id);

    if (isInRoom) {
        return users;
    }

    return {
        ...users,
        [roomId]: [...users[roomId], user]
    };
};

export const verifyUser = (socket: Socket, next: Function) => {
    if (socket.request.session.passport) {
        return next();
    } else {
        socket.disconnect();
        next(new Error('Authentication error'));
    }
};

export const validateRoomId = (socket: Socket, next: Function): string => {
    const breakExecution = () => {
        socket.disconnect();
        next(new Error('Invalid or empty articleId'));
    };

    const roomId = getRoomID(socket) as any;

    if (roomId === undefined || roomId === null) {
        breakExecution();
    }

    if (!(typeof roomId === 'string' || roomId instanceof String)) {
        breakExecution();
    }

    if (!Types.ObjectId.isValid(roomId as string)) {
        breakExecution();
    }

    return next();
};

export const getUserID = (socket: Socket): string =>
    socket.request.session.passport.user;

export const getRoomID = (socket: Socket): string =>
    socket.handshake.query.articleId;
