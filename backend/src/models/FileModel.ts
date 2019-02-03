import { Schema, model } from 'mongoose';

export const FileSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: [true, 'Please provide a content'] },
  type: { type: String, required: [true, 'Please provide a type'] },
  path: { type: String, required: [true, 'Please provide a path'] },
  uploadBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_date: {
    type: Date,
    default: Date.now()
  }
});

export const FileModel = model('File', FileSchema, 'files');
