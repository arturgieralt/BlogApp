import { IUserWithId } from 'models/User/IUserModel';
import { IRoleWithId } from 'models/Role/IRoleModel';

export const usersSeed: IUserWithId[] = [
    {
        _id: '5d1a44b66970a011ed25ca0e',
        name: 'myUser',
        email: 'mymail@op.pl',
        isActive: true,
        passwordHash: 'dfsdfsdfsf',
        created_date: '2019-10-04T00:00:00.000Z',
        avatarUrl: 'dsfsdfs.jpg'
    }
];

export const roleSeed: IRoleWithId[] = [
    {
        _id: '9d1a44b66970a011ed25ca0e',
        userId: '5d1a44b66970a011ed25ca0e',
        roleName: 'Admin'
    },
    {
        _id: '101a44b66970a011ed25ca0e',
        userId: '5d1a44b66970a011ed25ca0e',
        roleName: 'Moderator'
    }
]