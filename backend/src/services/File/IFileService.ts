import { IFileModel, IFile, IFileWithId } from 'models/File/IFileModel';
import { IDeleteResultObject } from 'models/common/IDeleteResultObject';
import { IFindFileDto } from 'dtos/file/IFindFile';

export interface IFileService {
    get: (queryData: IFindFileDto) => Promise<IFileModel[]>;
    getSingle: (id: string) => Promise<IFileWithId | null>;
    add: (body: IFile) => Promise<IFileModel>;
    remove: (id: string) => Promise<IDeleteResultObject>;
}
