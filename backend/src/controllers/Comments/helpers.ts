import { RoomUser, RoomUsers } from './CommentsController';

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
