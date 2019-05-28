import { IUserModel } from "models/User/IUserModel";
import { IVerifyOptions } from "passport-local";

export interface IVerifyUserMiddleware {
    verifyUser : (
        name: string,
        password: string,
        done: (error: any, user?: IUserModel | boolean, options?: IVerifyOptions) => void
      ) => void;
}