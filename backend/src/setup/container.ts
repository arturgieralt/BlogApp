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
import CommentsController from '../controllers/Comments/CommentsController';
import { iot } from '../server';
import FileService from '../services/File/FileService';
import { FileModel } from '../models/File/FileModel';
import FilesController from '../controllers/Files/FilesController';
import AuthorizeMiddleware from '../middlewares/Authorize/Authorize';
import VerifyUserMiddleware from '../middlewares/VerifyUser/VerifyUser';

export const tokenFactory = new TokenFactory();

export const tokenService = new TokenService(TokenModel, tokenFactory);
export const userService = new UserService(UserModel);
export const roleService = new RoleService(RoleModel);
export const commentService = new CommentService(CommentModel);
export const articleService = new ArticleService(ArticleModel);
export const captchaService = new CaptchaService();
export const fileSerivce = new FileService(FileModel);

export const verifyUserMiddleware = new VerifyUserMiddleware(userService);
export const authorizeMiddleware = new AuthorizeMiddleware(roleService, tokenService);

export const captchaController = new CaptchaController(captchaService);
export const articlesController = new ArticlesController(articleService, commentService);
export const usersController = new UsersController(userService, tokenService, roleService);
export const filesController = new FilesController(userService, fileSerivce);
