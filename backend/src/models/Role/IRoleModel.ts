import { Document } from 'mongoose';

export interface IRoleModel extends Document {
    userId: string;
    roleName: string;
}
