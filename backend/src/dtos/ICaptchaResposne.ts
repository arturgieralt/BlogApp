export interface ICaptchaResponse {
    success: boolean;
    challange_ts: string;
    hostname: string;
    'error-codes'?: string[];
}
