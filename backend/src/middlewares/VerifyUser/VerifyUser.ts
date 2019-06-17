import { IVerifyOptions } from 'passport-local';
import { IUserModel } from 'models/User/IUserModel';
import { IUserService } from 'services/User/IUserService';
import { IVerifyUserMiddleware } from './IVerifyUser';
import { IEncryptor } from 'types/externals';

export default class VerifyUserMiddleware implements IVerifyUserMiddleware {
    public constructor(
        private UserService: IUserService,
        private bcrypt: IEncryptor
    ) {}

    public verifyUser = async (
        name: string,
        password: string,
        done: (
            error: any,
            user?: IUserModel | boolean,
            options?: IVerifyOptions
        ) => void
    ) => {
        try {
            const user = await this.UserService.getSingleByName(name);
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
                message: 'Incorect username or password'
            });
        } catch (error) {
            return done(error);
        }
    };
}
