import { Schema, model } from 'mongoose';
import { IUserModel } from './IUserModel';

function validateUsername(username: string) {
    return username.length < 30 && username.length > 4;
}

export const UserSchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
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
        avatarName: { type: String }
    },
    { id: false }
);

export const UserModel = model<IUserModel>('User', UserSchema, 'users');
