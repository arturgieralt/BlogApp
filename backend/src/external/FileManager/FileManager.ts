import { IFileManager } from './IFileManager';
import { IFileSystem } from './../../types/externals';

export default class FileManager implements IFileManager {
    constructor(private fs: IFileSystem, private path: string) {}

    remove(name: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.fs.unlink(
                this.path + name,
                (err: NodeJS.ErrnoException | null) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                }
            );
        });
    }
}
