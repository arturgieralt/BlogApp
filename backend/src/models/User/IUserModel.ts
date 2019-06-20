import { Document } from 'mongoose';
import { IIdentity } from 'models/common/IIdentity';

export interface IUser {
    name: string;
    email: string;
    isActive: boolean;
    passwordHash: string;
    created_date: string;
    avatarUrl: string;
}

export interface IUserWithId extends IUser, IIdentity {

}

export interface IUserModel extends IUser, Document {
}

export interface IUserDto {
    name: string;
    email: string;
    isActive: boolean;
    avatarUrl: string;
}
