import { Schema, model } from 'mongoose';
import { IRoleModel } from './IRoleModel';

export const RoleSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        roleName: {
            type: String
        }
    },
    { id: false }
);

export const RoleModel = model<IRoleModel>('Role', RoleSchema, 'roles');
