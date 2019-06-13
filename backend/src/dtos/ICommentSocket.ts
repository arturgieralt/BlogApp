import { Socket } from 'socket.io';
import { IAuthToken } from '../factories/Token/IAuthToken';

export interface ICommentSocket extends Socket {
    articleId: string;
    decodedToken: IAuthToken;
}
