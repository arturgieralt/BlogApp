import { Request, Response, NextFunction } from 'express';
import { IArticleService } from '../../services/Article/IArticleService';
import { ICommentService } from '../../services/Comment/ICommentService';
import { IArticlesController } from './IArticlesController';
import { IAuthToken } from 'factories/Token/IAuthToken';
import { IFindArticleDto } from 'dtos/article/IFindArticle';

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
        try {
            const articles = await this.ArticleService.get(
                req.body as IFindArticleDto
            );
            res.status(200).json(articles);
        } catch (e) {
            res.status(400).json({ e });
        }
    };

    public getSingle = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { articleId } = req.params;
            const article = await this.ArticleService.getSingle(articleId);
            const comments = await this.CommentService.get(articleId);
            res.status(200).json({
                ...article,
                comments
            });
        } catch (e) {
            res.status(400).json({ e });
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                body,
                params: { articleId }
            } = req.params;
            await this.ArticleService.update(articleId, body);
            res.status(200).send();
        } catch (e) {
            res.status(400).json({ e });
        }
    };

    public getTagsCounted = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const tags = await this.ArticleService.getTagsCounted();
            res.status(200).send(tags);
        } catch (e) {
            res.status(400).json({ e });
        }
    };

    public add = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req;
            const { user }: { user?: IAuthToken } = req;
            await this.ArticleService.add(body, user!.id);
            res.status(200).send();
        } catch (e) {
            res.status(400).json({ e });
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { articleId } = req.params;
            await this.ArticleService.remove(articleId);
            res.status(200).send();
        } catch (e) {
            res.status(400).json({ e });
        }
    };
}
