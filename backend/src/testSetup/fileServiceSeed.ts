import { IUserWithId } from './../models/User/IUserModel';
import { IFileWithId } from 'models/File/IFileModel';

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

export const filesSeed: IFileWithId[] = [
    {
        _id: '5ccf5c4050bca72ec4a33ba3',
        created_date: '2019-05-05T21:56:12.414+00:00',
        uploadBy: '5ccf4f2ba2338a253197defe',
        originalname: 'IMG_20190224_162034.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 4477391,
        destination: 'uploads',
        filename: '1557093440074-IMG_20190224_162034.jpg',
        path: 'uploads/1557093440074-IMG_20190224_162034.jpg',
        tags: ['article', 'javascript']
    },
    {
        _id: '9ccf5c4050bca72ec4a33ba3',
        created_date: '2019-05-05T21:56:12.414+00:00',
        uploadBy: '5ccf4f2ba2338a253197defe',
        originalname: 'IMG_20190224_162034.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 4477391,
        destination: 'uploads',
        filename: '1557093440074-IMG_20190224_162034.jpg',
        path: 'uploads/1557093440074-IMG_20190224_162034.jpg',
        tags: ['article', 'node']
    },
    {
        _id: '90cf5c4050bca72ec4a33ba3',
        created_date: '2019-05-05T21:56:12.414+00:00',
        uploadBy: '5ccf4f2ba2338a253197defe',
        originalname: 'IMG_20190224_162034.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 4477391,
        destination: 'uploads',
        filename: '1557093440074-IMG_20190224_162034.jpg',
        path: 'uploads/1557093440074-IMG_20190224_162034.jpg',
        tags: ['avatar']
    },
    {
        _id: '50cf5c4050bca72ec4a33ba3',
        created_date: '2019-05-05T21:56:12.414+00:00',
        uploadBy: '5d1a44b66970a011ed25ca0e',
        originalname: 'myAvatar.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 4477391,
        destination: 'uploads',
        filename: '1557093440074-myAvatar.jpg',
        path: 'uploads/1557093440074-myAvatar.jpg',
        tags: ['avatar']
    },
    {
        _id: '59cf5c4050bca72ec4a33ba3',
        created_date: '2019-05-05T21:56:12.414+00:00',
        uploadBy: '5ccf4f2ba2338a253197defe',
        originalname: 'IMG_20190224_162034.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 4477391,
        destination: 'uploads',
        filename: '1557093440074-IMG_20190224_162034.jpg',
        path: 'uploads/1557093440074-IMG_20190224_162034.jpg',
        tags: ['article', 'javascript']
    },
    {
        _id: '55cf5c4050bca72ec4a33ba3',
        created_date: '2019-05-05T21:56:12.414+00:00',
        uploadBy: '5d1a44b66970a011ed25ca0e',
        originalname: 'myAvatar.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 4477391,
        destination: 'uploads',
        filename: '1557093440074-myAvatar.jpg',
        path: 'uploads/1557093440074-myAvatar.jpg',
        tags: ['avatar']
    }
];
