import { Schema, model } from 'mongoose';

export const RoleSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  roleName: {
    type: String
  }
});

export const RoleModel = model('Role', RoleSchema, 'roles');
