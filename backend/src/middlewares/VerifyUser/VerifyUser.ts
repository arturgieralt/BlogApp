import { IVerifyOptions } from 'passport-local';
import { IUserModel, accountType, IUser } from 'models/User/IUserModel';
import { IUserService } from 'services/User/IUserService';
import { IVerifyUserMiddleware } from './IVerifyUser';
import { IEncryptor } from 'types/externals';

export default class VerifyUserMiddleware implements IVerifyUserMiddleware {
    public constructor(
        private UserService: IUserService,
        private bcrypt: IEncryptor
    ) {}

    public verifyUser = async (
        email: string,
        password: string,
        done: (
            error: any,
            user?: IUserModel | boolean,
            options?: IVerifyOptions
        ) => void
    ) => {
        try {
            const user = await this.UserService.getSingleByMail(email);
            if (user) {
                const storedPass = user.passwordHash;
                const doesPasswordMatch = await this.bcrypt.compare(
                    password,
                    storedPass
                );

                if (doesPasswordMatch) {
                    return done(null, user);
                }
            }

            return done(null, false, {
                message: 'Incorect email or password'
            });
        } catch (error) {
            return done(error);
        }
    };

    public verifyExternalUser = async (
        email: string,
        externalId: string,
        provider: accountType
    ) => {
        try {
            const user = await this.UserService.getSingleByMail(email);
            if (user) {
                if (
                    user.externalId === externalId &&
                    user.accountType === provider
                ) {
                    return user;
                }
                return new Error('Incorrect userId or provider.');
            } else {
                return null;
            }
        } catch (error) {
            return error as Error;
        }
    };
}
