import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../../services/User/IUserService';
import { IFileService } from '../../services/File/IFileService';
import { IFilesController } from './IFilesController';
import { IFileManager } from './../../external/FileManager/IFileManager';

export default class FilesController implements IFilesController {
    public constructor(
        private UserService: IUserService,
        private FileService: IFileService,
        private FileManager: IFileManager
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

            const oldAvatars = await this.FileService.get({
                uploadBy: id,
                tags: ['avatar']
            });
            // remove old avatars
            oldAvatars.map(f => this.FileManager.remove(f.filename));

            await this.FileService.removeAvatarEntries(id);

            await this.FileService.add({
                uploadBy: id,
                originalname,
                encoding,
                mimetype,
                size,
                destination,
                filename,
                path,
                tags: ['avatar']
            });

            await this.UserService.update(id, { avatarUrl: filename });

            return res.status(200).send(req.file);
        } catch (e) {
            return res.status(500).json(e);
        }
    };
}
