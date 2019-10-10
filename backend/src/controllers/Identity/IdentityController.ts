import { Request, Response, NextFunction } from 'express';
import { IAxios } from './../../types/externals';
import { IIdentityController } from './IIdentityController';
import { IVerifyUserMiddleware } from './../../middlewares/VerifyUser/IVerifyUser';
import { IUserService } from './../../services/User/IUserService';
import { IRoleService } from './../../services/Role/IRoleService';
import { ITokenService } from './../../services/TokenService/ITokenService';
import { welcomeMail } from './../../builders/MailServiceBuilder/templates';
import { Transporter } from 'nodemailer';
import { IEnvProvider } from 'providers/EnvProvider/IEnvProvider';
import { IFileManager } from 'external/FileManager/IFileManager';
import { ReadStream } from 'fs';
import { IFileService } from 'services/File/IFileService';
import StoragePathProvider from '../../providers/StoragePathProvider';

export default class IdentityController implements IIdentityController {
    public constructor(
        private axios: IAxios,
        private verifyUserMiddleware: IVerifyUserMiddleware,
        private userService: IUserService,
        private roleService: IRoleService,
        private tokenService: ITokenService,
        private mailService: Transporter,
        private envProvider: IEnvProvider,
        private fileManager: IFileManager,
        private fileService: IFileService
    ) {}

    public verifyFacebookToken = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { token } = req.body;
        const appId = this.envProvider.get('FB_APP_ID');
        const secret = this.envProvider.get('FB_SECRET');

        const tokenResponse = await this.axios.get(
            `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${appId}|${secret}`
        );
        const encodedToken: FacebookToken = tokenResponse.data;
        const userResponse = await this.axios.get(
            `https://graph.facebook.com/${encodedToken.data.user_id}?fields=id,name,email,picture.width(720).height(720)&access_token=${token}`
        );
        const { email, id, name, picture }: FacebookUser = userResponse.data;


        let systemUser = await this.verifyUserMiddleware.verifyExternalUser(
            email,
            id,
            'facebook'
        );
        if (systemUser === null) {
            const response = await this.axios({
                url: picture.data.url,
                method: 'GET',
                responseType: 'stream'
            });
            //save picture
            await this.fileManager.save(
                response.data as ReadStream,
                `${id}.jpeg`
            );
            // register

            //add picture entry to db! is it smart?

            systemUser = await this.userService.addExternal(
                name,
                email,
                id,
                `${id}.jpeg`,
                'facebook'
            );

            await this.fileService.add({
                uploadBy: systemUser._id,
                filename: `${id}.jpeg`,
                originalname: `${id}.jpeg`,
                destination: StoragePathProvider.getPathNoSlash(),
                path: `${StoragePathProvider.getPath()}${id}.jpeg`,
                tags: ['avatar']
            });

            const verToken = await this.tokenService.createVerificationToken(
                systemUser._id
            );
            this.mailService.sendMail(welcomeMail(systemUser, verToken));
        }

        if (systemUser instanceof Error) {
            return next(systemUser);
        }

        const roles = await this.roleService.getRolesPerUser(systemUser._id);
        const {
            token: accessToken,
            payload
        } = await this.tokenService.createToken(systemUser, roles);
        const loginSuccess = await this.userService.login(req, payload);

        if (loginSuccess) {
            res.status(200).send({ token: accessToken });
        } else {
            this.tokenService.blacklist(payload.tokenId);
            res.status(401).send({ message: 'Cannot log in' });
        }
    };
}

type FacebookToken = {
    data: {
        app_id: string;
        type: string;
        application: string;
        data_access_expires_at: number;
        expires_at: number;
        is_valid: boolean;
        scopes: string[];
        user_id: string;
    };
};

type FacebookUser = {
    email: string;
    id: string;
    name: string;
    picture: {
        data: {
            height: number;
            is_silhouette: boolean;
            url: string;
            width: number;
        };
    };
};
