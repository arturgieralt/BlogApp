import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../../services/User/IUserService';
import { IFileService } from '../../services/File/IFileService';
import { IFilesController } from './IFilesController';

export default class FilesController implements IFilesController {
    public constructor(
        private UserService: IUserService,
        private FileService: IFileService
    ) {}

    public uploadAvatar = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const {
                originalname,
                encoding,
                mimetype,
                size,
                destination,
                filename,
                path
            } = req.file;
            const { id } = req.user;

            await this.FileService.add({
                uploadBy: id,
                originalname,
                encoding,
                mimetype,
                size,
                destination,
                filename,
                path
            });

            await this.UserService.update(id, { avatarName: filename });

            return res.status(200).send(req.file);
        } catch (e) {
            return res.status(500).json(e);
        }
    };
}
