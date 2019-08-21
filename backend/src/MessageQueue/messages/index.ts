import { IUserModel } from "./../../models/User/IUserModel";
import { IMessageBody } from "./IMessageBody";
import { SendWelcomeEmailMessage } from "./topics";

export const sendWelcomeMailMessage = (user: IUserModel): IMessageBody<IUserModel> => ({
    topic: SendWelcomeEmailMessage,
    data: user
})