import { Schema, model } from 'mongoose';
import { ITokenModel } from './ITokenModel';

export const TokenSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  expTime: { type: Number,  required: true },
  isActive: { type: Boolean, required: true },
  created_date: {
    type: Date,
    default: Date.now()
  },
});

export const TokenModel = model<ITokenModel>('Token', TokenSchema, 'tokens');
