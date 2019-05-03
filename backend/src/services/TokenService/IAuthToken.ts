export interface IAuthToken {
     id: string;
     name: string;
     email: string;
     expires: number;
     userRoles: string[];
     scopes: string[];
     tokenId: string;
}