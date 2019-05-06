export interface IAuthToken {
     id: string;
     exp: number;
     userRoles: string[];
     scopes: string[];
     tokenId: string;
     aud: string;
     iss: string;
}