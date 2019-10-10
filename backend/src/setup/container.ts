import { stubInterface } from 'ts-sinon';
import UsersController from '../controllers/Users/UsersController';
import UserService from '../services/User/UserService';
import { UserModel } from '../models/User/UserModel';
import { TokenService } from '../services/TokenService/TokenService';
import { TokenModel } from '../models/Token/TokenModel';
import TokenFactory from './../factories/Token/TokenFactory';
import RoleService from '../services/Role/RoleService';
import { RoleModel } from '../models/Role/RoleModel';
import ArticlesController from '../controllers/Articles/ArticlesController';
import CommentService from '../services/Comment/CommentService';
import { CommentModel } from '../models/Comment/CommentModel';
import ArticleService from '../services/Article/ArticleService';
import { ArticleModel } from '../models/Article/ArticleModel';
import CaptchaController from '../controllers/Captcha/CaptchaController';
import CaptchaService from '../services/Captcha/CaptchaService';
import FileService from '../services/File/FileService';
import { FileModel } from '../models/File/FileModel';
import FilesController from '../controllers/Files/FilesController';
import AuthorizeMiddleware from '../middlewares/Authorize/Authorize';
import VerifyUserMiddleware from '../middlewares/VerifyUser/VerifyUser';
import EnvProvider from '../providers/EnvProvider/EnvProvider';
import MailServiceBuilder from '../builders/MailServiceBuilder/MailServiceBuilder';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import FileUploaderMiddleware from '../middlewares/FileUploader/FileUploader';
import FileManager from '../external/FileManager/FileManager';
import fs from 'fs';
import IdentityController from './../controllers/Identity/IdentityController';
import { IJWT, IFileSystem, IAxios, IEncryptor, IMulter } from 'types/externals';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { ITokenModel } from 'models/Token/ITokenModel';
import { IArticleModel } from 'models/Article/IArticleModel';
import { ICommentModel } from 'models/Comment/ICommentModel';
import { IFileModel } from 'models/File/IFileModel';
import { IRoleModel } from 'models/Role/IRoleModel';
import { IUserModel } from 'models/User/IUserModel';
import { IEnvProvider } from 'providers/EnvProvider/IEnvProvider';
import { IMailServiceBuilder } from 'builders/MailServiceBuilder/IMailServiceBuilder';
import { ITokenFactory } from 'factories/Token/ITokenFactory';
import { StorageEngine } from 'multer';
import { RequestHandler } from 'express';

export let jwtModule: IJWT;
export let fsModule: IFileSystem;
export let axiosModule: IAxios;
export let bcryptModule: IEncryptor;
export let dateModule: typeof Date;
export let multerModule: IMulter ;
export let messageQueueModule: Queue ;

export let tokenModel: Model<ITokenModel, {}>;
export let articleModel: Model<IArticleModel, {}>;
export let commentModel: Model<ICommentModel, {}>;
export let fileModel: Model<IFileModel, {}>;
export let roleModel: Model<IRoleModel, {}>;
export let userModel: Model<IUserModel, {}>;

export let envProvider: IEnvProvider ;
export let mailBuilder: IMailServiceBuilder ;
export let tokenFactory: ITokenFactory;

if(process.env.NODE_ENV === 'test' ) {
    fsModule = stubInterface<IFileSystem>();
    axiosModule = stubInterface<IAxios>();
    dateModule = stubInterface<typeof Date>();
   
    multerModule = function(this: any) {
        let that = this;
        that.single = () => ({} as RequestHandler);
        return that;
     } as unknown as IMulter;
     multerModule.memoryStorage =  () => ({} as StorageEngine);
     multerModule.diskStorage = () => ({}  as StorageEngine);
    
     messageQueueModule = stubInterface<Queue>();

} else {
    multerModule = require('multer');
    fsModule = fs ;
    axiosModule = axios;
    dateModule = Date;
    messageQueueModule = require('./../MessageQueue/');
}

bcryptModule = bcrypt;
jwtModule = jwt;
tokenModel = TokenModel;
articleModel = ArticleModel;
commentModel = CommentModel;
fileModel = FileModel;
roleModel = RoleModel;
userModel = UserModel;

// others
envProvider = new EnvProvider();;
mailBuilder = new MailServiceBuilder(envProvider) ;
tokenFactory = new TokenFactory(envProvider, jwtModule);

export const fileManager = new FileManager(fsModule);
export const mailService = mailBuilder.withService('gmail').build();
export const tokenService = new TokenService(tokenModel, tokenFactory);
export const userService = new UserService(userModel, envProvider, bcryptModule);
export const roleService = new RoleService(roleModel);
export const commentService = new CommentService(commentModel);
export const articleService = new ArticleService(articleModel);
export const captchaService = new CaptchaService(envProvider, axiosModule);
export const fileSerivce = new FileService(fileModel);

export const fileUploaderMiddleware = new FileUploaderMiddleware(
    multerModule,
    'file',
    dateModule
);

export const verifyUserMiddleware = new VerifyUserMiddleware(
    userService,
    bcryptModule
);
export const authorizeMiddleware = new AuthorizeMiddleware(
    roleService
);

export const identityController = new IdentityController(
    axiosModule,
    verifyUserMiddleware,
    userService,
    roleService,
    tokenService,
    mailService,
    envProvider,
    fileManager,
    fileSerivce
);
export const captchaController = new CaptchaController(captchaService);
export const articlesController = new ArticlesController(
    articleService,
    commentService
);
export const usersController = new UsersController(
    userService,
    tokenService,
    roleService,
    mailService,
    messageQueueModule
);
export const filesController = new FilesController(
    userService,
    fileSerivce,
    fileManager
);
