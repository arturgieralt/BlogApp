import * as articleService from './../services/ArticleService';
import { Request, Response, NextFunction } from 'express';
import { getAllForArticle } from './../services/CommentService';


class ArticlesController {

   getAll = async (req: Request, res: Response,  next: NextFunction) => {

     try {
      const articles = await articleService.getAll();
      res.status(200).json(articles);
     }catch(e){
      res.status(400).json({ e });
     }

  }
  
   getSingle = async (req: Request, res: Response,  next: NextFunction) => {

    try {
      const { articleId } = req.params;
      const article = await articleService.getSingle(articleId);
      const comments = await getAllForArticle(articleId);
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
      await articleService.update(articleId, body);
      res.status(200).send();
     }catch(e){
      res.status(400).json({ e });
     }
    
  }
  
   add = async (req: Request, res: Response,  next: NextFunction) => {

    try {
      const { body } = req;
      await articleService.add(body);
      res.status(200).send();
     }catch(e){
      res.status(400).json({ e });
     }

     
  }
  
   remove = async (req: Request, res: Response,  next: NextFunction) => {

    try {
      const { articleId } = req.params;
      await articleService.remove(articleId);
      res.status(200).send();
     }catch(e){
      res.status(400).json({ e });
     }
    
  }

}

export default new ArticlesController()