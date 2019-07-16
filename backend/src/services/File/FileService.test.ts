import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserModel } from '../../models/User/UserModel';
import { usersSeed, filesSeed } from '../../testSetup/fileServiceSeed';
import { FileModel } from '../../models/File/FileModel';
import FileService from './FileService';
import { expectedFiles } from '../../testSetup/fileServiceExpected';

let mongoServer: MongoMemoryServer;

describe('File service:', () => {
    before(async () => {
        mongoServer = new MongoMemoryServer();
        const url = await mongoServer.getConnectionString();
        mongoose.connect(url, { useNewUrlParser: true });
        await UserModel.insertMany(usersSeed);
        await FileModel.insertMany(filesSeed);
    });

    after(() => {
        mongoose.disconnect();
        mongoServer.stop();
    });

    describe('get single', () => {
        it('should return null when no id matches', async () => {
            const fileService = new FileService(FileModel);
            const file = await fileService.getSingle('111a44b66970a011ed25ca0e');

            expect(file).to.equal(null);
        });

        it('should return object when id matches', async () => {
            const fileService = new FileService(FileModel);
            const file = await fileService.getSingle('5ccf5c4050bca72ec4a33ba3');

            expect(file).to.deep.equal(expectedFiles[0]);
        });
    });

    describe('get', () => {
        it('should all when no query object provided', async () => {
            const fileService = new FileService(FileModel);
            const files = await fileService.get({});

            expect(files).to.deep.equal(expectedFiles);
        });

        it('should return all for uploader', async () => {
            const fileService = new FileService(FileModel);
            const files = await fileService.get({uploadBy: '5ccf4f2ba2338a253197defe'});

            expect(files).to.deep.equal([expectedFiles[0], expectedFiles[1], expectedFiles[2], expectedFiles[4]]);
        });

        it('should return all for uploader and tagged avatar', async () => {
            const fileService = new FileService(FileModel);
            const files = await fileService.get({
                uploadBy: '5ccf4f2ba2338a253197defe',
                tags: ['avatar']
            });

            expect(files).to.deep.equal([expectedFiles[2]]);
        });

        it('should return all for uploader and tagged avatar or node', async () => {
            const fileService = new FileService(FileModel);
            const files = await fileService.get({
                uploadBy: '5ccf4f2ba2338a253197defe',
                tags: ['avatar', 'node']
            });

            expect(files).to.deep.equal([expectedFiles[1], expectedFiles[2]]);
        });

        it('should return all for uploader and tagged article and javascript', async () => {
            const fileService = new FileService(FileModel);
            const files = await fileService.get({
                uploadBy: '5ccf4f2ba2338a253197defe',
                tags: ['article', 'javascript'],
                containsAll: true
            });

            expect(files).to.deep.equal([expectedFiles[0], expectedFiles[4]]);
        });
    });

    describe('add', () => {
        it('should add new file entry', async () => {

            const fileToAdd =  {
                uploadBy: '5ccf4f2ba2338a253197defe',
                originalname: 'IMG_20190224_162034.jpg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                size: 4477391,
                destination: 'uploads',
                filename: '1557093440074-IMG_20190224_162034.jpg',
                path: 'uploads/1557093440074-IMG_20190224_162034.jpg',
                tags: ['ARTICLE', 'javascript']
            }

            const expected = {
                ...fileToAdd,
                uploadBy: new mongoose.Types.ObjectId('5ccf4f2ba2338a253197defe'),
                tags: ['article', 'javascript']
            }

            
            const fileService = new FileService(FileModel);
            const file = await fileService.add(fileToAdd);

            expect(file.toObject()).to.deep.include(expected);
        });

    });

    describe('remove element', () => {

        it('should not remove file when Id is incorrect', async () => {
            const fileService = new FileService(FileModel);
            const fileRemoved = await fileService.remove(
                '001a44b66970a011ed25ca0e'
            );

            expect(fileRemoved).to.include({ deletedCount: 0 });
        });

        it('should remove file when Id is provided', async () => {
            const fileService = new FileService(FileModel);
            const fileRemoved = await fileService.remove(
                '59cf5c4050bca72ec4a33ba3'
            );

            expect(fileRemoved).to.include({ deletedCount: 1 });
        });


    });
});
