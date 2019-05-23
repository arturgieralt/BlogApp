import { FileModel } from '../models/File/FileModel';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { IFileModel, IFileModelDto } from '../models/File/IFileModel';

export function getAll(): Promise<Document | {}> {
  return FileModel.find({}).exec();
}

export function getSingle(id: string): Promise<Document | null> {
  return FileModel.findById(id).exec();
}

export function add(body: IFileModelDto): Promise<IFileModel> {
  const file = new FileModel({
    ...body,
    _id: new mongoose.Types.ObjectId()
  });
  return file.save();
}

export function remove(id: string): Promise<any> {
  return FileModel.remove({ _id: id }).exec();
}
