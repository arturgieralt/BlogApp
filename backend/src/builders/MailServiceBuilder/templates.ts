import { IUserModel } from 'models/User/IUserModel';

export const welcomeMail = ({ email, name, verificationCode }: IUserModel) => ({
    to: email,
    subject: 'Welcome on art of web. Activate your account.', // Subject line
    html: `<b>Hello ${name}</b><br /> You have to copy this token and paste it in the user panel.<br />${verificationCode}` // html body
});

export const accountActivated = ({ email, name }: IUserModel) => ({
    to: email,
    subject: 'Your account was activated!.', // Subject line
    html: `<b>Hello ${name}</b><br /> You can comment now!` // html body
});

export const accountRemoved = ({ email, name }: IUserModel) => ({
    to: email,
    subject: 'Your account was removed!.', // Subject line
    html: `<b>Hello ${name}</b><br /> Your account was fully removed!` // html body
});
