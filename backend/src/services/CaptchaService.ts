import axios from "axios";

export default class CaptchaService {
  verifyToken =  (token: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data }: {data: ICaptchaResponse} = await axios
                .post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${token}`);
            const isValidHostname = data.hostname === 'localhost'
            resolve(data.success && isValidHostname);

        } catch(e) {
            reject(e);
        }
    
    });
  };
}


export interface ICaptchaResponse {
    success: boolean;
    challange_ts: string;
    hostname: string;
    "error-codes" ?: string[];
}