import { Schema, model } from 'mongoose';
import { IFileModel } from './IFileModel';

export const FileSchema = new Schema({
    _id: Schema.Types.ObjectId,
    originalname: { type: String, required: true },
    encoding: { type: String, required: false },
    mimetype: { type: String, required: false },
    size: { type: Number, required: false },
    destination: { type: String, required: false },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    tags: [{ type: String }],
    uploadBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    created_date: {
        type: Date,
        default: Date.now()
    }
});

export const FileModel = model<IFileModel>('File', FileSchema, 'files');
