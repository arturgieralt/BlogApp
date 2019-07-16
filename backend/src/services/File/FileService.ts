import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { IFileModel, IFile, IFileWithId } from '../../models/File/IFileModel';
import { IFileService } from './IFileService';
import { IDeleteResultObject } from '../../models/common/IDeleteResultObject';
import { IFindFileDto } from './../../dtos/file/IFindFile';
import { getQueryObject } from './helpers';

export default class FileService implements IFileService {
    public constructor(private FileModel: Model<IFileModel, {}>) {}

    public get = (queryData: IFindFileDto): Promise<IFileModel[]> => {
        return this.FileModel.find(getQueryObject(queryData))
            .select('-__v')
            .lean()
            .exec();
    };

    public getSingle = (id: string): Promise<IFileWithId | null> => {
        return this.FileModel.findById(id)
            .select('-__v')
            .lean()
            .exec();
    };

    public add = (body: IFile): Promise<IFileModel> => {
        const file = new this.FileModel({
            ...body,
            tags: body.tags.map((t: string) => t.toLowerCase().trim()),
            _id: new mongoose.Types.ObjectId()
        });
        return file.save();
    };

    public remove = (id: string): Promise<IDeleteResultObject> => {
        return this.FileModel.remove({ _id: id }).exec();
    };

    public removeAvatarEntries = (userId: string): Promise<IDeleteResultObject> => {
        return this.FileModel.deleteMany({
            uploadBy: userId,
            tags: ['avatar']
         }).exec();
    };
}
