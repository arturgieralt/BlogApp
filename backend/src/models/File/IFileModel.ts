import { Document } from 'mongoose';
import { IIdentity } from 'models/common/IIdentity';

export interface IFile {
    originalname: string;
    encoding?: string;
    mimetype?: string;
    size?: number;
    destination: string;
    filename: string;
    path: string;
    uploadBy: string;
    tags: string[];
    created_date?: string;
}

export interface IFileWithId extends IFile, IIdentity {}

export interface IFileModel extends IFile, Document {}
