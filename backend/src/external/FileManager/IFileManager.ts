export interface IFileManager {
    remove: (name: string) => Promise<boolean>;
}
