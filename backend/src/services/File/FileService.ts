import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { IFileModel, IFileModelDto } from '../../models/File/IFileModel';
import { IFileService } from './IFileService';

export default class FileService implements IFileService {
  constructor (private FileModel: Model<IFileModel, {}>){ 
  }

  getAll = (): Promise<IFileModel | {}> => {
    return this.FileModel.find({}).exec();
  }
  
  getSingle = (id: string): Promise<IFileModel | null> => {
    return this.FileModel.findById(id).exec();
  }
  
  add = (body: IFileModelDto): Promise<IFileModel> => {
    const file = new this.FileModel({
      ...body,
      _id: new mongoose.Types.ObjectId()
    });
    return file.save();
  }
  
  remove = (id: string): Promise<any> => {
    return this.FileModel.remove({ _id: id }).exec();
  }
  
}

