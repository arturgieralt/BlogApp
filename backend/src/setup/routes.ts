import { Application } from 'express';
import { BaseValidator } from '../validators/BaseValidator';
import { IArticlesController } from '../controllers/Articles/IArticlesController';
import { IUsersController } from '../controllers/Users/IUsersController';
import { IFilesController } from '../controllers/Files/IFilesController';
import { ICaptchaController } from '../controllers/Captcha/ICaptchaController';
import { IAuthorizeMiddleware } from '../middlewares/Authorize/IAuthorize';
import FileUploaderMiddleware from '../middlewares/FileUploader/FileUploader';
import registerRoutes from '../utils/registerRoutes';
import IdentityController from 'controllers/Identity/IdentityController';
import { IIdentityController } from 'controllers/Identity/IIdentityController';

export const DELETE = 'delete';
export const PUT = 'put';
export const GET = 'get';
export const POST = 'post';

export interface Route {
    controller: Function;
    middlewares?: any[];
}

export interface RouteMapping {
    [key: string]: {
        [key: string]: Route;
    };
}

export class Routes {
    public routes(
        app: Application,
        ArticlesController: IArticlesController,
        UsersController: IUsersController,
        FilesController: IFilesController,
        CaptchaController: ICaptchaController,
        AuthorizeMiddleware: IAuthorizeMiddleware,
        FileUploader: FileUploaderMiddleware,
        IdentityController: IIdentityController
    ): void {
        const routeMap: RouteMapping = {
            '/articles': {
                [GET]: {
                    controller: ArticlesController.getList
                },
                [POST]: {
                    controller: ArticlesController.getList
                }
            },

            '/articles/add': {
                [POST]: {
                    controller: ArticlesController.add,
                    middlewares: [AuthorizeMiddleware.authorize(['Admin'])]
                }
            },

            '/articles/:articleId': {
                [GET]: {
                    controller: ArticlesController.getSingle
                },
                [PUT]: {
                    controller: ArticlesController.update,
                    middlewares: [AuthorizeMiddleware.authorize(['Admin'])]
                },
                [DELETE]: {
                    controller: ArticlesController.remove,
                    middlewares: [AuthorizeMiddleware.authorize(['Admin'])]
                }
            },

            '/tags': {
                [GET]: {
                    controller: ArticlesController.getTagsCounted
                }
            },

            '/users': {
                [GET]: {
                    controller: UsersController.getAll,
                    middlewares: [AuthorizeMiddleware.authorize()]
                }
            },

            '/user/register': {
                [POST]: {
                    controller: UsersController.register,
                    middlewares: [...BaseValidator.get('/user/register')]
                }
            },

            '/user/login': {
                [POST]: {
                    controller: UsersController.login,
                    middlewares: [...BaseValidator.get('/user/login')]
                }
            },

            '/user/login/facebook': {
                [POST]: {
                    controller: IdentityController.verifyFacebookToken
                }
            },

            '/user/logout': {
                [POST]: {
                    controller: UsersController.logout,
                    middlewares: [AuthorizeMiddleware.authorize()]
                }
            },

            '/user/verify': {
                [POST]: {
                    controller: UsersController.verify,
                    middlewares: [AuthorizeMiddleware.authorize()]
                }
            },

            '/user/remove': {
                [POST]: {
                    controller: UsersController.remove,
                    middlewares: [AuthorizeMiddleware.authorize()]
                }
            },

            '/user/profile': {
                [GET]: {
                    controller: UsersController.getMyProfile,
                    middlewares: [AuthorizeMiddleware.authorize()]
                }
            },

            '/user/avatar/:userId': {
                [GET]: {
                    controller: UsersController.getAvatar
                }
            },

            '/users/:userId': {
                [GET]: {
                    controller: UsersController.getSingle,
                    middlewares: [AuthorizeMiddleware.authorize()]
                },
                [PUT]: {
                    controller: UsersController.update,
                    middlewares: [AuthorizeMiddleware.authorize()]
                },
                [DELETE]: {
                    controller: UsersController.remove,
                    middlewares: [AuthorizeMiddleware.authorize()]
                }
            },

            '/captcha/verify': {
                [POST]: {
                    controller: CaptchaController.verifyToken
                }
            },

            '/avatar/upload': {
                [POST]: {
                    controller: FilesController.uploadAvatar,
                    middlewares: [
                        AuthorizeMiddleware.authorize(),
                        FileUploader.getRequestHandler()
                    ]
                }
            }
        };

        registerRoutes(app, routeMap);
    }
}
