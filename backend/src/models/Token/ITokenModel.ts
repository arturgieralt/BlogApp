import { Document } from "mongoose";

export interface ITokenModel extends Document{
    userId: string,
    expTime: number,
    isActive: boolean,
    created_date: Date
}