import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as fileService from './../services/FileService';
import multer, { StorageEngine } from 'multer';
import UserService from './../services/UserService';

export class FilesController {

  static FILE_FIELD_NAME = 'file';
  static DEST = 'uploads';

  private storage: StorageEngine;
  private requestHandler: RequestHandler

  constructor() {

    this.storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, FilesController.DEST)
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname )
      }
      })

    this.requestHandler = multer({
        storage: this.storage
      }).single(FilesController.FILE_FIELD_NAME);

  }

  
  // async  _remove(fileId: string) {
  //   // validation here
  //   return fileService
  //     .getSingle(fileId)
  //     .then(fileDoc => {
  //       if (fileDoc) {
  //         return fileStorage.removeFromStorage(fileDoc);
  //       }
  //       return Promise.reject('No fileId in DB');
  //     })
  //     .then(() => fileService.remove(fileId))
  //     .catch(error => Promise.reject(error));
  // }
  
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
  
     await fileService.add({
        uploadBy: id,
        originalname,
        encoding,
        mimetype,
        size,
        destination,
        filename,
        path
      });
  
      await UserService.update(id, {avatarName: filename});
    
      return res.status(200).send(req.file)
    } catch(e) {
      return res.status(500).json(err)
    }
    
  });
  }
}

const FilesControllerInstance = new FilesController();
export default FilesControllerInstance;