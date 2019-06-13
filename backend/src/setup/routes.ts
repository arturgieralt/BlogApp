import { Application } from 'express';
import { BaseValidator } from '../validators/BaseValidator';
import { IArticlesController } from '../controllers/Articles/IArticlesController';
import { IUsersController } from '../controllers/Users/IUsersController';
import { IFilesController } from '../controllers/Files/IFilesController';
import { ICaptchaController } from '../controllers/Captcha/ICaptchaController';
import { IAuthorizeMiddleware } from '../middlewares/Authorize/IAuthorize';

export class Routes {
    public routes(
        app: Application,
        ArticlesController: IArticlesController,
        UsersController: IUsersController,
        FilesController: IFilesController,
        CaptchaController: ICaptchaController,
        AuthorizeMiddleware: IAuthorizeMiddleware
    ): void {
        app.route('/articles')
            .get(ArticlesController.getAll)
            .post(ArticlesController.getAllByTags);

        app.route('/articles/add').post(AuthorizeMiddleware.authorize(['Admin']), ArticlesController.add);

        app.route('/articles/:articleId')
            .get(ArticlesController.getSingle)
            .put(AuthorizeMiddleware.authorize(['Admin']), ArticlesController.update)
            .delete(AuthorizeMiddleware.authorize(['Admin']), ArticlesController.remove);

        app.route('/tags').get(ArticlesController.getTagsCounted);

        app.route('/users').get(AuthorizeMiddleware.authorize(), UsersController.getAll);

        app.route('/user/register').post(...BaseValidator.get('/user/register'), UsersController.register);

        app.route('/user/login').post(...BaseValidator.get('/user/login'), UsersController.login);

        app.route('/user/logout').post(AuthorizeMiddleware.authorize(), UsersController.logout);

        app.route('/user/verify').post(
            ...BaseValidator.get('/user/verify'),
            AuthorizeMiddleware.authorize(),
            UsersController.verify
        );

        app.route('/user/remove').post(AuthorizeMiddleware.authorize(), UsersController.remove);

        app.route('/user/profile').get(AuthorizeMiddleware.authorize(), UsersController.getMyProfile);

        app.route('/captcha/verify').post(CaptchaController.verifyToken);

        app.route('/users/:userId')
            .get(AuthorizeMiddleware.authorize(), UsersController.getSingle)
            .put(AuthorizeMiddleware.authorize(), UsersController.update)
            .delete(AuthorizeMiddleware.authorize(), UsersController.remove);

        app.route('/avatar/upload').post(AuthorizeMiddleware.authorize(), FilesController.uploadAvatar);
    }
}
