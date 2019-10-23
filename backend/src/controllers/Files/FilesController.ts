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
        const {
            originalname,
            encoding,
            mimetype,
            size,
            destination,
            filename,
            path
        } = req.file;
        const { _id: id } = req.user as any;

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

        res.status(200).send(req.file);
    };
}
