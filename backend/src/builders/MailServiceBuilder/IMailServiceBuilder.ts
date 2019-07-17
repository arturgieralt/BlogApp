import { Transporter } from 'nodemailer';

export interface IMailServiceBuilder {
    withService: (service: string) => IMailServiceBuilder;
    build: () => Transporter;
}
