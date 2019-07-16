import mongoose from 'mongoose';
import { filesSeed } from './fileServiceSeed';

export const expectedFiles = filesSeed.map(el => ({
    ...el,
    created_date: new Date(el.created_date!),
    _id: new mongoose.Types.ObjectId(el._id),
    uploadBy: new mongoose.Types.ObjectId(el.uploadBy)
}));
