import { Application } from "express";
import { ArticlesController } from './controllers/ArticlesController';

const articlesController = new ArticlesController(); // dependency injection - to do

export class Routes {
    public routes(app: Application): void {
        app.route('/articles')
            .get(articlesController.getAll)
            .post(articlesController.add);
        app.route('/articles/:articleId')
            .get(articlesController.getSingle)
            .put(articlesController.update)
            .delete(articlesController.delete);
    }
}