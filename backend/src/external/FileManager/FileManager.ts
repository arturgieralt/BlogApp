import { IFileManager } from './IFileManager';
import { IFileSystem } from './../../types/externals';
import { ReadStream } from 'fs';
import StoragePathProvider from './../../providers/StoragePathProvider';


export default class FileManager implements IFileManager {
    constructor(
        private fs: IFileSystem
    ) {}

    remove(name: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.fs.unlink(
                StoragePathProvider.getPath() + name,
                (err: NodeJS.ErrnoException | null) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                }
            );
        });
    }

    save(data: ReadStream, name: string): Promise<boolean | Error> {
        return new Promise(async (resolve, reject) => {
            const writer = this.fs.createWriteStream(StoragePathProvider.getPath() + name);
            data.pipe(writer);
            writer.on('finish', () => resolve(true));
            writer.on('error', e => reject(e));
        });
    }
}
