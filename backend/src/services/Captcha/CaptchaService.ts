import axios from 'axios';
import { ICaptchaResponse } from 'dtos/ICaptchaResposne';
import { ICaptchaService } from './ICaptchaService';

export default class CaptchaService implements ICaptchaService {
    public verifyToken = (token: string): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
            try {
                const { data }: { data: ICaptchaResponse } = await axios.post(
                    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${token}`
                );
                const isValidHostname = data.hostname === 'localhost';
                resolve(data.success && isValidHostname);
            } catch (e) {
                reject(e);
            }
        });
    };
}
