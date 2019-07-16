import { createTransport, Transporter } from 'nodemailer';
import { IEnvProvider } from 'providers/EnvProvider/IEnvProvider';
import { IMailServiceBuilder } from './IMailServiceBuilder';

export default class MailServiceBuilder implements IMailServiceBuilder {
    private service: string = 'gmail';

    constructor(private EnvProvider: IEnvProvider) {}

    withService(service: string): MailServiceBuilder {
        this.service = service;
        return this;
    }

    build(): Transporter {
        return createTransport({
            service: this.service,
            auth: {
                user: this.EnvProvider.get('MAIL'),
                pass: this.EnvProvider.get('MAIL_PASS')
            }
        });
    }
}
