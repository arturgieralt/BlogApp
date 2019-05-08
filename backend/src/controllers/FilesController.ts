import { Request, Response, NextFunction } from 'express';
import * as fileService from './../services/FileService';
import * as fileStorage from './../services/FileStorageService';
import { baseController } from './BaseController';
import multer from 'multer';
import UserService from './../services/UserService';

// const FILE_FIELD_NAME = 'file';
// const DEST = 'uploads/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' + file.originalname )
}
})

export const uploadMulter = multer({
  storage: storage
}).single('file');

const provideAll = (req: Request, res: Response, next: NextFunction) => [
  req,
  res
];

const provideIdParam = (req: Request, res: Response, next: NextFunction) => [
  req.params.fileId
];

const provideFileAndBodyParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => [req.file, req.body];

function _getAll() {
  return fileService.getAll();
}

function _getSingle(fileId: string) {
  return fileService.getSingle(fileId);
}

async function _remove(fileId: string) {
  // validation here
  return fileService
    .getSingle(fileId)
    .then(fileDoc => {
      if (fileDoc) {
        return fileStorage.removeFromStorage(fileDoc);
      }
      return Promise.reject('No fileId in DB');
    })
    .then(() => fileService.remove(fileId))
    .catch(error => Promise.reject(error));
}

export async function upload(req: Request, res: Response, next: NextFunction) {

  uploadMulter(req, res, async (err) => {
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

    const fileEntry = await fileService.add({
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

export const getAll = baseController(_getAll);
export const getSingle = baseController(_getSingle, provideIdParam);
export const remove = baseController(_remove, provideIdParam);