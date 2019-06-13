import { Schema, model } from 'mongoose';
import { IFileModel } from './IFileModel';

export const FileSchema = new Schema({
    _id: Schema.Types.ObjectId,
    originalname: { type: String, required: true },
    encoding: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    destination: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    uploadBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    created_date: {
        type: Date,
        default: Date.now()
    }
});

export const FileModel = model<IFileModel>('File', FileSchema, 'files');
