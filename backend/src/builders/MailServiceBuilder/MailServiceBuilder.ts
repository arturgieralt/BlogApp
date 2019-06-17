import { createTransport, Transporter } from 'nodemailer';
import { IEnvProvider } from 'providers/EnvProvider/IEnvProvider';
import { IMailServiceBuilder } from './IMailServiceBuilder';

export default class MailServiceBuilder implements IMailServiceBuilder {
    constructor(private EnvProvider: IEnvProvider) {}

    build(): Transporter {
        return createTransport({
            service: 'gmail',
            auth: {
                user: this.EnvProvider.get('MAIL'),
                pass: this.EnvProvider.get('MAIL_PASS')
            }
        });
    }
}
