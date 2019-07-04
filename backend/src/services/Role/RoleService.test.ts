import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserModel } from '../../models/User/UserModel';
import { RoleModel } from '../../models/Role/RoleModel';
import { roleSeed, usersSeed } from '../../testSetup/roleServiceSeed';
import RoleService from './RoleService';


let mongoServer: MongoMemoryServer;

describe('Role service:', () => {
    before(async () => {
        mongoServer = new MongoMemoryServer();
        const url = await mongoServer.getConnectionString();
        mongoose.connect(url, { useNewUrlParser: true });
        await RoleModel.insertMany(roleSeed);
        await UserModel.insertMany(usersSeed);
    });

    after(() => {
        mongoose.disconnect();
        mongoServer.stop();
    });

    describe('get roles for user method', () => {
        it('should return array with "User" role only when userId is not present in the list', async () => {
            const roleService = new RoleService(RoleModel);
            const roles = await roleService.getRolesPerUser('111a44b66970a011ed25ca0e');

            expect(roles).to.deep.equal(["User"]);
        });

        it('should return list of roles for user', async () => {
            const roleService = new RoleService(RoleModel);
            const roles = await roleService.getRolesPerUser('5d1a44b66970a011ed25ca0e');

            expect(roles).to.deep.equal(["User", "Admin", "Moderator"]);
        });
    });

});