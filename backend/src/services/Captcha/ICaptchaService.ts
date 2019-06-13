export interface ICaptchaService {
    verifyToken: (token: string) => Promise<boolean>;
}
