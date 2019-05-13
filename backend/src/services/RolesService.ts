import { Document } from 'mongoose';
import { RoleModel } from './../models/RoleModel';

export const getRoleNames = (rolesDocs: Document[] | null): string[] => rolesDocs === null
  ? []
  : rolesDocs.map((roleDoc: Document) => roleDoc.toObject().roleName);


export function getRolesPerUser(userId: string): Promise<string[]> {
  
  return new Promise(async (resolve, reject) => {
    try {
      const roles =  await RoleModel
      .find({ userId })
      .select('roleName -_id')
      .exec();

      const roleNames = getRoleNames(roles);
      resolve(['User', ...roleNames]);
      
    } catch(e) {
      reject(e);
    }
    
  })
}
