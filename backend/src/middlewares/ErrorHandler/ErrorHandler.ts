import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';
import mongoose from 'mongoose';

export default function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof mongoose.Error || err instanceof MongoError) {
        return res.status(503).json({
            type: 'MongoError',
            message: err.message
        });
    }

    return res.status(500).json(err.message);
}
