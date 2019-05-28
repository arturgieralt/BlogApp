import { Request, Response, NextFunction } from 'express';
import { IArticleService } from '../../services/Article/IArticleService';
import { ICommentService } from '../../services/Comment/ICommentService';
import { IArticlesController } from './IArticlesController';


export default class ArticlesController implements IArticlesController{

  constructor (private ArticleService: IArticleService, private CommentService: ICommentService) {

  }

   getAll = async (req: Request, res: Response,  next: NextFunction) => {

     try {
      const articles = await this.ArticleService.getAll();
      res.status(200).json(articles);
     }catch(e){
      res.status(400).json({ e });
     }

  }
  
   getSingle = async (req: Request, res: Response,  next: NextFunction) => {

    try {
      const { articleId } = req.params;
      const article = await this.ArticleService.getSingle(articleId);
      const comments = await this.CommentService.getAllForArticle(articleId);
      res.status(200).json({
        ...article,
        comments
      });
     }catch(e){
      res.status(400).json({ e });
     }
    
  }
  
   update = async (req: Request, res: Response,  next: NextFunction) => {
     
    try {
      const { body, params: { articleId } } = req.params;
      await this.ArticleService.update(articleId, body);
      res.status(200).send();
     }catch(e){
      res.status(400).json({ e });
     }
    
  }
  
   add = async (req: Request, res: Response,  next: NextFunction) => {

    try {
      const { body } = req;
      await this.ArticleService.add(body);
      res.status(200).send();
     }catch(e){
      res.status(400).json({ e });
     }

     
  }
  
   remove = async (req: Request, res: Response,  next: NextFunction) => {

    try {
      const { articleId } = req.params;
      await this.ArticleService.remove(articleId);
      res.status(200).send();
     }catch(e){
      res.status(400).json({ e });
     }
    
  }

}
