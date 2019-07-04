import { Document } from 'mongoose';
import { IIdentity } from 'models/common/IIdentity';

export interface IRole {
    userId: string;
    roleName: string;
}

export interface IRoleWithId extends IRole, IIdentity {}

export interface IRoleModel extends IRole, Document {
}

