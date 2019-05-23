import { Socket } from "socket.io";
import { IAuthToken } from "services/TokenService/IAuthToken";

export interface ICommentSocket extends Socket {
    articleId: string;
    decodedToken: IAuthToken;
}