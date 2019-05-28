import { Request, Response, NextFunction, RequestHandler } from 'express';
import multer, { StorageEngine } from 'multer';
import { IUserService } from '../../services/User/IUserService';
import { IFileService } from '../../services/File/IFileService';
import { IFilesController } from './IFilesController';

export default class FilesController implements IFilesController {

  static FILE_FIELD_NAME = 'file';
  static DEST = 'uploads';

  private storage: StorageEngine;
  private requestHandler: RequestHandler

  constructor(private UserService: IUserService, private FileService: IFileService) {
    this.storage = this.initStorage();
    this.requestHandler = this.initRequestHandler()
  }

  
  private initStorage () {
    return multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, FilesController.DEST)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname )
    }
    })
  }

  private initRequestHandler() {
    return multer({
      storage: this.storage
    }).single(FilesController.FILE_FIELD_NAME);
  }
  
  uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
  
    this.requestHandler(req, res, async (err) => {
    if (err) {
        return res.status(500).json(err)
    } 
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
  
      await this.UserService.update(id, {avatarName: filename});
    
      return res.status(200).send(req.file)
    } catch(e) {
      return res.status(500).json(err)
    }
    
  });
  }
}