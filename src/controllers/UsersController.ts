import {Request, Response} from "express";
import { UserModel } from '../models/UserModel';
import mongoose from "mongoose";

export class UsersController {
    public getAll(req: Request, res: Response) {
        UserModel.find({}, (err, articles) => {
            if(err) {
                res.send(err);
            }
            res.json(articles);
        });
    }

    public getSingle(req: Request, res: Response) {
        UserModel.findById(req.params.userId, (err, article) => {
            if(err) {
                res.send(err);
            }
            res.json(article);
        });
    }

    public update(req: Request, res: Response) {
        UserModel.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, (err, article) => {
            if(err) {
                res.send(err);
            }
            res.json(article);
        });
    }

    public add(req: Request, res: Response) {
        const article = new UserModel({
            ...req.body,
            _id: new mongoose.Types.ObjectId()
        }
           )
            ;
        article.save((err, article) => {
            if(err) {
                res.send(err);
            }
            res.json(article);
        })
    }

    public delete(req: Request, res: Response) {
        UserModel.remove({_id: req.params.userId}, (err) => {
            if(err) {
                res.send(err);
            }
            res.json({msg: 'Removed'});
        });
    }
}