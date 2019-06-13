export interface IRoleService {
    getRolesPerUser: (userId: string) => Promise<string[]>;
}
