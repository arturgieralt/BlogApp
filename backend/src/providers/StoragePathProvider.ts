import path from 'path';

export default class StoragePathProvider {
    static getPath(): string {
        return path.dirname(__dirname) + '/uploads/';
    }

    static getPathNoSlash(): string {
        return path.dirname(__dirname) + '/uploads';
    }
}
