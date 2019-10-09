import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StorageEngine } from 'multer';

import { IMulter } from 'types/externals';
import StoragePathProvider from './../../providers/StoragePathProvider';

export default class FileUploaderMiddleware {
    private storage: StorageEngine;
    private requestHandler: RequestHandler | null;

    public constructor(
        private multer: IMulter,
        private fileFieldName: string,
        private dateTimeProvider: DateConstructor
    ) {
        this.storage = this.initStorage();
        this.requestHandler = this.initRequestHandler();
    }

    private initStorage() {
        const { dateTimeProvider } = this;
        return this.multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, StoragePathProvider.getPathNoSlash());
            },
            filename: function(req, file, cb) {
                cb(null, dateTimeProvider.now() + '-' + file.originalname);
            }
        });
    }

    private initRequestHandler() {
        const { fileFieldName } = this;
        try {
            return this.multer({
                storage: this.storage
            }).single(fileFieldName);
        } catch(e) {
            console.log(e)
            return null;
        }
        
    }

    public getRequestHandler = () => (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        this.requestHandler && this.requestHandler(req, res, async err => {
            if (err) {
                return next(err);
            }
            return next();
        });
    };
}
