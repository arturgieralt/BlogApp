import { Request, Response, NextFunction } from 'express';
import { IArticleService } from '../../services/Article/IArticleService';
import { ICommentService } from '../../services/Comment/ICommentService';
import { IArticlesController } from './IArticlesController';
import { IFindArticleDto } from 'dtos/article/IFindArticle';
import { IUserModel } from 'models/User/IUserModel';

export default class ArticlesController implements IArticlesController {
    public constructor(
        private ArticleService: IArticleService,
        private CommentService: ICommentService
    ) {}

    public getList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const articles = await this.ArticleService.get(
            req.body as IFindArticleDto
        );

        res.status(200).json(articles);
    };

    public getSingle = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { articleId } = req.params;
        const article = await this.ArticleService.getSingle(articleId);
        const comments = await this.CommentService.get(articleId);

        res.status(200).json({
            ...article,
            comments
        });
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        const {
            body,
            params: { articleId }
        } = req.params;

        await this.ArticleService.update(articleId, body);

        res.status(200).send();
    };

    public getTagsCounted = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const tags = await this.ArticleService.getTagsCounted();

        res.status(200).send(tags);
    };

    public add = async (req: Request, res: Response, next: NextFunction) => {
        const { body } = req;
        const { user }: { user?: IUserModel } = req;
console.log(req);
        await this.ArticleService.add(body, user!._id);

        res.status(200).send();
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        const { articleId } = req.params;

        await this.ArticleService.remove(articleId);

        res.status(200).send();
    };
}
