import { Socket } from 'socket.io';

export interface ICommentSocket extends Socket {
    articleId: string;
}
