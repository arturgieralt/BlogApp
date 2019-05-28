import { IFileModel, IFileModelDto } from "models/File/IFileModel";

export interface IFileService {
    getAll: () => Promise<IFileModel | {}> ;
    getSingle: (id: string) => Promise<IFileModel | null> ;
    add: (body: IFileModelDto) => Promise<IFileModel> ;
    remove: (id: string) => Promise<any> ;
}