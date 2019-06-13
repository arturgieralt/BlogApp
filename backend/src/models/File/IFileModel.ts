import { Document } from 'mongoose';

export interface IFileModelDto {
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    uploadBy: string;
}

export interface IFileModel extends IFileModelDto, Document {}
