import { Application } from 'express';
import ArticlesController from './controllers/ArticlesController';
import UsersController from './controllers/UsersController';
import FilesController from './controllers/FilesController';
import { authorize } from './auth/authorize';
import CaptchaController from './controllers/CaptchaController';

export class Routes {
  public routes(app: Application): void {
    app
      .route('/articles')
      .get(ArticlesController.getAll)
      .post(authorize(['Admin']), ArticlesController.add);
    app
      .route('/articles/:articleId')
      .get(ArticlesController.getSingle)
      .put(authorize(['Admin']), ArticlesController.update)
      .delete(authorize(['Admin']), ArticlesController.remove);

    // app
    //   .route('/comments')
    //   .get(authorize(), CommentsController.getAll)
    //   .post(authorize(), CommentsController.add);
    // app
    //   .route('/comments/:commentId')
    //   .get(authorize(), CommentsController.getSingle)
    //   .put(authorize(), CommentsController.update)
    //   .delete(authorize(), CommentsController.remove);

    app.route('/users').get(authorize(), UsersController.getAll);
    app.route('/user/register').post(UsersController.register);
    app.route('/user/login').post(UsersController.login);
    app.route('/user/logout').post(authorize(), UsersController.logout);
    app.route('/user/verify').post(authorize(), UsersController.verify);
    app.route('/user/remove').post(authorize(), UsersController.remove);
    app.route('/user/profile').get(authorize(), UsersController.getMyProfile);
    app.route('/captcha/verify').post(CaptchaController.verifyToken);

    app
      .route('/users/:userId')
      .get(authorize(), UsersController.getSingle)
      .put(authorize(), UsersController.update)
      .delete(authorize(), UsersController.remove);

    // app
    //   .route('/files')
    //   .get(authorize(['Admin']), FilesController.getAll)
    //   .post(
    //     authorize(['Admin']),
    //     FilesController.FILE_UPLOAD_SETTINGS,
    //     FilesController.upload

    app
      .route('/avatar/upload')
      .post(authorize(), FilesController.uploadAvatar)

    // app
    //   .route('/files/:fileId')
    //   .get(authorize(['Admin']), FilesController.getSingle)
    //   .delete(authorize(['Admin']), FilesController.remove);
  }
}
