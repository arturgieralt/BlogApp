import { Model } from 'mongoose';
import { ITokenModel } from 'models/Token/ITokenModel';
import TokenFactory, {
    Authorization,
    VerifyAccount,
    TokenType
} from '../../factories/Token/TokenFactory';
import { TokenModel } from '../../models/Token/TokenModel';
import { IUserModel } from 'models/User/IUserModel';
import { IAuthToken } from '../../factories/Token/IAuthToken';
import { IVerifyToken } from '../../factories/Token/IVerifyToken';
import { ITokenFactory } from 'factories/Token/ITokenFactory';

export class TokenService {
    public constructor(
        private TokenRepository: Model<ITokenModel, {}>,
        private tokenFactory: ITokenFactory
    ) {}

    public add = (body: any): Promise<ITokenModel> => {
        const token = new this.TokenRepository({
            ...body
        });
        return token.save();
    };

    public blacklist = (id: string): Promise<ITokenModel | null> => {
        return this.TokenRepository.findOneAndUpdate(
            { _id: id },
            { isActive: false },
            { new: true }
        ).exec();
    };

    public blacklistAllForUser = (id: string): Promise<ITokenModel | null> => {
        return this.TokenRepository.updateMany(
            { userId: id },
            { isActive: false },
            { new: true }
        ).exec();
    };
    public getAll = (): Promise<ITokenModel | {}> => {
        return this.TokenRepository.find({}).exec();
    };

    public getAllForUser = (id: string): Promise<ITokenModel[]> => {
        return this.TokenRepository.find({ userId: id }).exec();
    };

    public getSingle = (id: string): Promise<ITokenModel> => {
        return this.TokenRepository.findById(id)
            .lean()
            .exec();
    };

    public remove = (
        id: string
    ): Promise<{ ok?: number | undefined; n?: number | undefined }> => {
        return this.TokenRepository.remove({ _id: id }).exec();
    };

    public verifyToken = (
        token: string,
        tokenType: TokenType
    ): Promise<IAuthToken | IVerifyToken> => {
        return this.tokenFactory.verifyToken(token, tokenType);
    };

    public createVerificationToken = (id: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const tokenEntry = await this.add({
                    userId: id,
                    expTime: TokenFactory.ExpTime[VerifyAccount],
                    isActive: true
                });

                resolve(
                    this.tokenFactory.getVerificationToken(id, tokenEntry.id)
                );
            } catch (e) {
                reject(e);
            }
        });
    };

    public createToken = (
        user: IUserModel,
        userRoles: string[]
    ): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                const tokenEntry = await this.add({
                    userId: user.toObject()._id,
                    expTime: TokenFactory.ExpTime[Authorization],
                    isActive: true
                });

                resolve(
                    this.tokenFactory.getAuthToken(
                        user,
                        userRoles,
                        tokenEntry.id
                    )
                );
            } catch (e) {
                reject(e);
            }
        });
    };
}
