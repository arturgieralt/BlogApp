import { Application } from 'express';
import * as ArticlesController from './controllers/ArticlesController';
import * as CommentsController from './controllers/CommentsController';
import * as UsersController from './controllers/UsersController';
import passport = require('passport');

export class Routes {
  public routes(app: Application): void {
    app
      .route('/articles')
      .get(ArticlesController.getAll)
      .post(ArticlesController.add);
    app
      .route('/articles/:articleId')
      .get(ArticlesController.getSingle)
      .put(ArticlesController.update)
      .delete(ArticlesController.remove);

    app
      .route('/comments')
      .get(CommentsController.getAll)
      .post(CommentsController.add);
    app
      .route('/comments/:commentId')
      .get(CommentsController.getSingle)
      .put(CommentsController.update)
      .delete(CommentsController.remove);

    app
      .route('/users')
      .get(
        passport.authenticate('jwt', { session: false }),
        UsersController.getAll
      );
    app.route('/register').post(UsersController.register);
    app.route('/login').post(UsersController.login);

    app
      .route('/users/:userId')
      .get(UsersController.getSingle)
      .put(UsersController.update)
      .delete(UsersController.remove);
  }
}
