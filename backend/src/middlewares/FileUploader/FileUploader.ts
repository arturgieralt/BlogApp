import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StorageEngine } from 'multer';

import { IMulter } from 'types/externals';

export default class FileUploaderMiddleware {
    private storage: StorageEngine;
    private requestHandler: RequestHandler;

    public constructor(
        private multer: IMulter,
        private destination: string,
        private fileFieldName: string,
        private dateTimeProvider: DateConstructor
    ) {
        this.storage = this.initStorage();
        this.requestHandler = this.initRequestHandler();
    }

    private initStorage() {
        const { destination, dateTimeProvider } = this;
        return this.multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, destination);
            },
            filename: function(req, file, cb) {
                cb(null, dateTimeProvider.now() + '-' + file.originalname);
            }
        });
    }

    private initRequestHandler() {
        const { fileFieldName } = this;
        return this.multer({
            storage: this.storage
        }).single(fileFieldName);
    }

    public getRequestHandler = () => (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        this.requestHandler(req, res, async err => {
            if (err) {
                return next(err);
            }
            return next();
        });
    };
}
