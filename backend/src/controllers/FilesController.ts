import { Request, Response, NextFunction } from 'express';
import * as fileService from './../services/FileService';
import * as fileStorage from './../services/FileStorageService';
import { baseController } from './BaseController';
import multer from 'multer';

const FILE_FIELD_NAME = 'file';
const DEST = 'uploads/';

export const FILE_UPLOAD_SETTINGS = multer({
  dest: DEST
}).single(FILE_FIELD_NAME);

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

async function _upload(file: any, body: any) {
  const {
    fieldName,
    originalname,
    encoding,
    mimetype,
    size,
    destination,
    filename,
    path
  } = file;
  const { uploadBy } = body; // chamge!

  try {
    return fileService.add({
      fieldName,
      uploadBy,
      originalname,
      encoding,
      mimetype,
      size,
      destination,
      filename,
      path
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

export const getAll = baseController(_getAll);
export const getSingle = baseController(_getSingle, provideIdParam);
export const remove = baseController(_remove, provideIdParam);
export const upload = baseController(_upload, provideFileAndBodyParams);
