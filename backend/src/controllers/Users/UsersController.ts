import { Request, Response, NextFunction } from 'express';
import {
    welcomeMail,
    accountActivated,
    accountRemoved
} from '../../builders/MailServiceBuilder/templates';
import { IUserModel } from './../../models/User/IUserModel';
import { IVerifyToken } from '../../factories/Token/IVerifyToken';
import { VerifyAccount } from '../../factories/Token/TokenFactory';
import { IAuthToken } from '../../factories/Token/IAuthToken';
import { IUserService } from '../../services/User/IUserService';
import { ITokenService } from '../../services/TokenService/ITokenService';
import { IRoleService } from '../../services/Role/IRoleService';
import { IUsersController } from './IUsersController';
import { Transporter } from 'nodemailer';

export default class UserController implements IUsersController {
    public constructor(
        private UserService: IUserService,
        private TokenService: ITokenService,
        private RoleService: IRoleService,
        private MailService: Transporter,
        private storagePath: string
    ) {}

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.UserService.getAll();

        return res.json(result);
    };

    public getSingle = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const result = await this.UserService.getSingle(req.body.id);
        return res.json(result);
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        // validation here

        const { user }: { user?: IAuthToken } = req;
        const result = await this.UserService.update(user!.id, req.body);
        return res.json(result);
    };

    public getMyProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { user }: { user?: IAuthToken } = req;
        const userData = await this.UserService.getUserProfile(user!.id);
        res.status(200).send(userData);
    };

    public register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { name, password, email } = req.body;
        const user = await this.UserService.add(name, password, email);
        const token = await this.TokenService.createVerificationToken(user._id);
        this.MailService.sendMail(welcomeMail(user, token));
        res.status(200).send();
    };

    public verify = async (req: Request, res: Response, next: NextFunction) => {
        const { verifyToken: token } = req.body;

        const decoded: IVerifyToken = await this.TokenService.verifyToken(
            token,
            VerifyAccount
        );
        const user: IUserModel = await this.UserService.verify(decoded.id);
        await this.TokenService.blacklist(decoded.tokenId);
        this.MailService.sendMail(accountActivated(user));
        res.status(200).send();
    };

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const user: IUserModel = await this.UserService.authenticate(
            req,
            res,
            next
        );
        const roles = await this.RoleService.getRolesPerUser(
            user.toObject()._id
        );
        const { token, payload } = await this.TokenService.createToken(
            user.toObject(),
            roles
        );
        const loginSuccess = await this.UserService.login(req, payload);

        if (loginSuccess) {
            res.status(200).send({ token });
        } else {
            this.TokenService.blacklist(payload.tokenId);
            res.status(401).send({ message: 'Cannot log in' });
        }
    };

    public logout = (req: Request, res: Response) => {
        const { user }: { user?: IAuthToken } = req;
        this.TokenService.blacklist(user!.tokenId);
        req.logout();
        return res.status(200).send();
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        const { user }: { user?: IAuthToken } = req;
        await this.TokenService.blacklistAllForUser(user!.id);
        await this.UserService.remove(user!.id);
        this.MailService.sendMail(accountRemoved(user));
        req.logout();
        res.status(200).send();
    };

    public getAvatar = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const userId = req.params.userId;
        const user = await this.UserService.getUserProfile(userId);
        res.sendFile(this.storagePath + user.avatarUrl || 'default.jpg');
    };
}
