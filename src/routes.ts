import { Application } from 'express';
import * as ArticlesController from './controllers/ArticlesController';
import { CommentsController } from './controllers/CommentsController';
import { UsersController } from './controllers/UsersController';

// dependency injection - to do
const commentsController = new CommentsController();
const usersController = new UsersController();

export class Routes {
  public routes(app: Application): void {
    app
      .route('/articles')
      .get(ArticlesController.getAllArticles)
      .post(ArticlesController.addSingleArticle);
    app
      .route('/articles/:articleId')
      .get(ArticlesController.getSingleArticle)
      .put(ArticlesController.updateSingleArticle)
      .delete(ArticlesController.deleteSingleArticle);

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
