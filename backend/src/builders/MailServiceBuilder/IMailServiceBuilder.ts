import { Transporter } from 'nodemailer';

export interface IMailServiceBuilder {
    build: () => Transporter;
}
