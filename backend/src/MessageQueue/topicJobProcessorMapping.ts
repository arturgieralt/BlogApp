import { SendWelcomeEmailMessage } from './messages/topics'
import { ProcessCallbackFunction } from 'bull';
import { IMessageBody } from './messages/IMessageBody';
import {sendWelcomeMail} from './jobProcessors/sendEmail';

interface IMApping {
    [key: string]: ProcessCallbackFunction<IMessageBody<any>>
}
const handlersMapping: IMApping = {
    [SendWelcomeEmailMessage]: sendWelcomeMail
}

export default handlersMapping