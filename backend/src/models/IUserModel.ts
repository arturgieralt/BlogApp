import { Document } from "mongoose";

export interface IUserModel extends Document {
    name: string;
    email: string;
    isActive: boolean;
    passwordHash: string;
    created_date: Date;
    avatarUrl: string;
}

export interface IUserDto {
    name: string;
    email: string;
    isActive: boolean;
    avatarUrl: string;
}