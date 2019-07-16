import { Document, Model } from 'mongoose';
import { IRoleModel, IRoleWithId } from 'models/Role/IRoleModel';
import { IRoleService } from './IRoleService';

export default class RoleService implements IRoleService {
    public constructor(private RoleModel: Model<IRoleModel, {}>) {}

    public getRolesPerUser = (userId: string): Promise<string[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                const roles = await this.RoleModel.find({ userId })
                    .select('roleName -_id')
                    .lean()
                    .exec();

                const roleNames = this.getRoleNames(roles);
                resolve(['User', ...roleNames]);
            } catch (e) {
                reject(e);
            }
        });
    };

    private getRoleNames = (roles: IRoleWithId[] | null): string[] =>
        roles === null ? [] : roles.map((role: IRoleWithId) => role.roleName);
}
