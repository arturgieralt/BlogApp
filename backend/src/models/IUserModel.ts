import { Document } from "mongoose";

export interface IUserModel extends Document {
    name: string;
    email: string;
    isActive: boolean;
    passwordHash: string;
    created_date: Date;
}