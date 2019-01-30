import {Request, Response} from "express";
import { CommentModel } from '../models/CommentModel';

export class CommentsController {
    public getAll(req: Request, res: Response) {
        CommentModel.find({}, (err, articles) => {
            if(err) {
                res.send(err);
            }
            res.json(articles);
        });
    }

    public getSingle(req: Request, res: Response) {
        CommentModel.findById(req.params.commentId, (err, article) => {
            if(err) {
                res.send(err);
            }
            res.json(article);
        });
    }

    public update(req: Request, res: Response) {
        CommentModel.findOneAndUpdate({_id: req.params.commentId}, req.body, {new: true}, (err, article) => {
            if(err) {
                res.send(err);
            }
            res.json(article);
        });
    }

    public add(req: Request, res: Response) {
        const article = new CommentModel(req.body);
        article.save((err, article) => {
            if(err) {
                res.send(err);
            }
            res.json(article);
        })
    }

    public delete(req: Request, res: Response) {
        CommentModel.remove({_id: req.params.commentId}, (err) => {
            if(err) {
                res.send(err);
            }
            res.json({msg: 'Removed'});
        });
    }
}