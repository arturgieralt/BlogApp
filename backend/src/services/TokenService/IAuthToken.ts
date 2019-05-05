export interface IAuthToken {
     id: string;
     name: string;
     email: string;
     exp: number;
     userRoles: string[];
     scopes: string[];
     tokenId: string;
     isUserActive: boolean;
     aud: string;
     iss: string;
}