import { Document } from 'mongoose';
import { RoleModel } from './../models/RoleModel';

export function getRolesPerUser(userId: string): Promise<Document[] | null> {
  return RoleModel.find({ userId }).exec();
}
