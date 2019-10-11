import { Request, Response, NextFunction } from 'express';
import {
    accountActivated,
    accountRemoved
} from '../../builders/MailServiceBuilder/templates';
import {
    IUserModel,
    IUserDto,
    IUserLiteWithId,
    IUserWithId
} from './../../models/User/IUserModel';
import { IUserService } from '../../services/User/IUserService';
import { IRoleService } from '../../services/Role/IRoleService';
import { IUsersController } from './IUsersController';
import { Transporter } from 'nodemailer';
import StoragePathProvider from './../../providers/StoragePathProvider';
import { sendWelcomeMailMessage } from './../../MessageQueue/messages';
import { Queue } from 'bull';

export default class UserController implements IUsersController {
    public constructor(
        private UserService: IUserService,
        private RoleService: IRoleService,
        private MailService: Transporter,
        private MessageQueue: Queue
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

        const { user }: { user?: IUserWithId } = req;
        const result = await this.UserService.update(user!._id, req.body);
        return res.json(result);
    };

    public getMyProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { user }: { user?: any } = req;
        const userData = await this.UserService.getUserProfile(user!._id);
        const roles = await this.RoleService.getRolesPerUser(user!._id);
        res.status(200).send({
            ...userData,
            roles
        });
    };

    public register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { name, password, email } = req.body;
        const user = await this.UserService.add(name, password, email);
        this.MessageQueue.add(sendWelcomeMailMessage(user));
        res.status(200).send();
    };

    public verify = async (req: Request, res: Response, next: NextFunction) => {
        const { verifyToken: token } = req.body;
        const { user }: { user?: any } = req;

        const userData: IUserModel = await this.UserService.verify(
            user.id,
            token
        );
        this.MailService.sendMail(accountActivated(userData));
        res.status(200).send();
    };

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const user: IUserModel = await this.UserService.authenticate(
            req,
            res,
            next
        );
        const [loginSuccess, error] = await this.UserService.login(req, user);

        if (loginSuccess) {
            res.status(200).send();
        } else {
            next(error);
        }
    };

    public logout = (req: Request, res: Response) => {
        req.logout();
        res.clearCookie('connect.sid');
        req.session!.destroy(() => {
            return res.status(200).send();
        });
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        const { user }: { user?: IUserLiteWithId } = req;
        await this.UserService.remove(user!._id);
        this.MailService.sendMail(accountRemoved(user as IUserModel));
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
        res.sendFile(
            StoragePathProvider.getPath() + user.avatarUrl || 'default.jpg'
        );
    };
}
