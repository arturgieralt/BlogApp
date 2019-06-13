import { Document, Model } from 'mongoose';
import { IRoleModel } from 'models/Role/IRoleModel';
import { IRoleService } from './IRoleService';

export default class RoleService implements IRoleService {
    public static getRoleNames = (rolesDocs: Document[] | null): string[] =>
        rolesDocs === null ? [] : rolesDocs.map((roleDoc: Document) => roleDoc.toObject().roleName);

    public constructor(private RoleModel: Model<IRoleModel, {}>) {}

    public getRolesPerUser = (userId: string): Promise<string[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                const roles = await this.RoleModel.find({ userId })
                    .select('roleName -_id')
                    .exec();

                const roleNames = RoleService.getRoleNames(roles);
                resolve(['User', ...roleNames]);
            } catch (e) {
                reject(e);
            }
        });
    };
}
