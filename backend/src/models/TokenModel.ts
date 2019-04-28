import { Schema, model } from 'mongoose';

export const TokenSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  expTime: { type: Number,  required: true },
  isActive: { type: Boolean, required: true },
  created_date: {
    type: Date,
    default: Date.now()
  },
});

export const TokenModel = model('Token', TokenSchema, 'tokens');
