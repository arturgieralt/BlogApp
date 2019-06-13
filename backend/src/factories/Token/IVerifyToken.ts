export interface IVerifyToken {
    id: string;
    exp: number;
    scopes: string[];
    tokenId: string;
    aud: string;
    iss: string;
}
