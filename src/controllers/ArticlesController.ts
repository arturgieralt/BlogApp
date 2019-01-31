import { Request, Response } from 'express';
import { ArticleModel } from './../models/ArticleModel';
import mongoose from 'mongoose';

export class ArticlesController {
  public getAll(req: Request, res: Response) {
    ArticleModel.find({})
      .populate('author')
      .exec((err, articles) => {
        if (err) {
          res.send(err);
        }
        res.json(articles);
      });
  }

  public getSingle(req: Request, res: Response) {
    ArticleModel.findById(req.params.articleId, (err, article) => {
      if (err) {
        res.send(err);
      }
      res.json(article);
    });
  }

  public update(req: Request, res: Response) {
    ArticleModel.findOneAndUpdate(
      { _id: req.params.articleId },
      req.body,
      { new: true },
      (err, article) => {
        if (err) {
          res.send(err);
        }
        res.json(article);
      }
    );
  }

  public add(req: Request, res: Response) {
    const article = new ArticleModel({
      ...req.body,
      _id: new mongoose.Types.ObjectId()
    });
    article.save((err, article) => {
      if (err) {
        res.send(err);
      }
      res.json(article);
    });
  }

  public delete(req: Request, res: Response) {
    ArticleModel.remove({ _id: req.params.articleId }, err => {
      if (err) {
        res.send(err);
      }
      res.json({ msg: 'Removed' });
    });
  }
}
