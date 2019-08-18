import { ReadStream } from "fs";

export interface IFileManager {
    remove: (name: string) => Promise<boolean>;
    save: (data: ReadStream, name: string) => Promise<boolean | Error>
}
