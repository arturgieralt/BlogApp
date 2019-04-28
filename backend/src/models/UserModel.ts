import { Schema, model } from 'mongoose';
import { validateUsername } from './../validators/UserValidators';

export const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    unique: true,
    required: [true, 'Please provide a username'],
    validate: [{ validator: validateUsername, msg: 'Invalid length' }]
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email']
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  passwordHash: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now()
  },
});

export const UserModel = model('User', UserSchema, 'users');
