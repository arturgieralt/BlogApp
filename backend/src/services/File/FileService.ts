import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { IFileModel, IFileModelDto } from '../../models/File/IFileModel';
import { IFileService } from './IFileService';

export default class FileService implements IFileService {
    public constructor(private FileModel: Model<IFileModel, {}>) {}

    public getAll = (): Promise<IFileModel | {}> => {
        return this.FileModel.find({}).exec();
    };

    public getSingle = (id: string): Promise<IFileModel | null> => {
        return this.FileModel.findById(id).exec();
    };

    public add = (body: IFileModelDto): Promise<IFileModel> => {
        const file = new this.FileModel({
            ...body,
            _id: new mongoose.Types.ObjectId()
        });
        return file.save();
    };

    public remove = (id: string): Promise<any> => {
        return this.FileModel.remove({ _id: id }).exec();
    };
}
