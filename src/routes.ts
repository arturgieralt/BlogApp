import { Application } from 'express';
import { ArticlesController } from './controllers/ArticlesController';
import { CommentsController } from './controllers/CommentsController';
import { UsersController } from './controllers/UsersController';

const articlesController = new ArticlesController(); // dependency injection - to do
const commentsController = new CommentsController();
const usersController = new UsersController();

export class Routes {
  public routes(app: Application): void {
    app
      .route('/articles')
      .get(articlesController.getAll)
      .post(articlesController.add);
    app
      .route('/articles/:articleId')
      .get(articlesController.getSingle)
      .put(articlesController.update)
      .delete(articlesController.delete);

    app
      .route('/comments')
      .get(commentsController.getAll)
      .post(commentsController.add);
    app
      .route('/comments/:commentId')
      .get(commentsController.getSingle)
      .put(commentsController.update)
      .delete(commentsController.delete);

    app
      .route('/users')
      .get(usersController.getAll)
      .post(usersController.add);
    app
      .route('/users/:userId')
      .get(usersController.getSingle)
      .put(usersController.update)
      .delete(usersController.delete);
  }
}
