import { Document } from 'mongoose';
import { RoleModel } from './../models/RoleModel';

export const getRoleNames = (rolesDocs: Document[] | null): string[] => rolesDocs === null
  ? []
  : rolesDocs.map((roleDoc: Document) => roleDoc.toObject().roleName);


export function getRolesPerUser(userId: string): Promise<string[]> {
  
  return new Promise(async (res, rej) => {
    try {
      const roles =  await RoleModel
      .find({ userId })
      .select('name -_id')
      .lean()
      .exec();

      const roleNames = getRoleNames(roles);
      res(roleNames);
      
    } catch(e) {
      rej(e);
    }
    
  })
}
