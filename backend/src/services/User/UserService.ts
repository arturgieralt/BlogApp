import { Model } from 'mongoose';
import passport = require('passport');
import { IVerifyOptions } from 'passport-local';
import { Request, Response, NextFunction } from 'express';
import { IUserModel, IUserDto, facebook } from 'models/User/IUserModel';
import { IAuthToken } from '../../factories/Token/IAuthToken';
import { IUserService } from './IUserService';
import { IEnvProvider } from 'providers/EnvProvider/IEnvProvider';
import { IEncryptor } from 'types/externals';

export default class UserService implements IUserService {
    public constructor(
        private UserRepository: Model<IUserModel, {}>,
        private EnvProvider: IEnvProvider,
        private bcrypt: IEncryptor
    ) {}

    public getAll = (): Promise<IUserModel> => {
        return this.UserRepository.find({})
            .lean()
            .exec();
    };

    public getSingle = (id: string): Promise<IUserModel> => {
        return this.UserRepository.findById(id)
            .lean()
            .exec();
    };

    public getUserProfile = (id: string): Promise<IUserDto> => {
        return this.UserRepository.findById(id)
            .select('name email isActive avatarUrl -_id')
            .lean()
            .exec();
    };

    public getSingleByName = (name: string): Promise<IUserModel | null> => {
        return this.UserRepository.findOne({ name }).exec();
    };

    public getSingleByMail = (email: string): Promise<IUserModel | null> => {
        return this.UserRepository.findOne({ email }).exec();
    };

    public update = (id: string, body: any): Promise<IUserModel> => {
        return this.UserRepository.findOneAndUpdate({ _id: id }, body, {
            new: true
        })
            .lean()
            .exec();
    };

    public verify = (id: string): Promise<IUserModel> => {
        return this.UserRepository.findOneAndUpdate(
            { _id: id },
            { isActive: true }
        )
            .lean()
            .exec();
    };

    public add = async (
        name: string,
        password: string,
        email: string
    ): Promise<IUserModel> => {
        return new Promise(async (resolve, reject) => {
            const rounds = Number(this.EnvProvider.get('PASS_ROUNDS'));

            try {
                const passwordHash = await this.bcrypt.hash(password, rounds);
                const user = new this.UserRepository({
                    name,
                    passwordHash,
                    email,
                    accountType: 'internal'
                });
                const userDoc = await user.save();
                resolve(userDoc.toObject());
            } catch (e) {
                reject(e);
            }
        });
    };

    public addExternal = async (
        name: string,
        email: string,
        externalId: string,
        avatarUrl: string,
        accountType: facebook
    ): Promise<IUserModel> => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = new this.UserRepository({
                    name,
                    email,
                    externalId,
                    accountType,
                    avatarUrl
                });
                const userDoc = await user.save();
                resolve(userDoc.toObject());
            } catch (e) {
                reject(e);
            }
        });
    };

    public remove = (id: string): Promise<any> => {
        return this.UserRepository.remove({ _id: id }).exec();
    };

    public authenticate = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        const authPromise = new Promise((resolve, reject) => {
            passport.authenticate(
                'local',
                { session: false },
                async (
                    error: any,
                    user: IAuthToken,
                    options?: IVerifyOptions
                ) => {
                    if (error || !user) {
                        reject({ ...error, ...options });
                    }
                    resolve(user);
                }
            )(req, res, next);
        });

        return authPromise;
    };

    public login = (req: Request, user: any): Promise<any> => {
        const loginPromise = new Promise((resolve, reject) => {
            req.login(user, error => {
                if (error) {
                    resolve([false, error]);
                }
                resolve([true]);
            });
        });

        return loginPromise;
    };
}
