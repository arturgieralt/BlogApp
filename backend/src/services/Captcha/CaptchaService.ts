import { ICaptchaResponse } from 'dtos/ICaptchaResposne';
import { ICaptchaService } from './ICaptchaService';
import { IEnvProvider } from 'providers/EnvProvider/IEnvProvider';
import { IAxios } from 'types/externals';

export default class CaptchaService implements ICaptchaService {
    constructor(private EnvProvider: IEnvProvider, private axios: IAxios) {}

    public verifyToken = (token: string): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    data
                }: { data: ICaptchaResponse } = await this.axios.post(
                    `https://www.google.com/recaptcha/api/siteverify?secret=${this.EnvProvider.get(
                        'CAPTCHA_SECRET'
                    )}&response=${token}`
                );
                const isValidHostname = data.hostname === 'localhost';
                resolve(data.success && isValidHostname);
            } catch (e) {
                reject(e);
            }
        });
    };
}
