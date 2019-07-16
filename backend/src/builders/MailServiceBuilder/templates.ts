export const welcomeMail = ({ email, name }: any, verifyToken: string) => ({
    to: email,
    subject: 'Welcome on art of web. Activate your account.', // Subject line
    html: `<b>Hello ${name}</b><br /> You have to copy this token and paste it in the user panel.<br />${verifyToken}` // html body
});

export const accountActivated = ({ email, name }: any) => ({
    to: email,
    subject: 'Your account was activated!.', // Subject line
    html: `<b>Hello ${name}</b><br /> You can comment now!` // html body
});

export const accountRemoved = ({ email, name }: any) => ({
    to: email,
    subject: 'Your account was removed!.', // Subject line
    html: `<b>Hello ${name}</b><br /> Your account was fully removed!` // html body
});
