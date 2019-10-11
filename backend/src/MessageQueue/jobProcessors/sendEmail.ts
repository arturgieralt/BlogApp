import { mailService } from './../../setup/container';
import { Job, DoneCallback } from 'bull';
import { IMessageBody } from './../messages/IMessageBody';
import { welcomeMail } from './../../builders/MailServiceBuilder/templates';
import { IUserModel } from './../../models/User/IUserModel';

export async function sendWelcomeMail(
    job: Job<IMessageBody<IUserModel>>,
    done: DoneCallback
) {
    const user = job.data.data;
    await mailService.sendMail(welcomeMail(user));
    done();
}
