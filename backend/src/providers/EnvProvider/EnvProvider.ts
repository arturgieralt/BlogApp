import { cleanEnv, str } from 'envalid';
import { IEnvProvider } from './IEnvProvider';
import { EnvVariables } from 'types/envVariables';

export default class EnvProvider implements IEnvProvider {
    public constructor() {
        this.validateEnvironment();
    }

    public get(name: EnvVariables): string {
        const envVariable = process.env[name];
        if (envVariable) {
            return envVariable;
        }
        throw new Error('No env variable!');
    }

    private validateEnvironment() {
        cleanEnv(process.env, {
            DB_CONNECTION_STRING: str(),
            SECRET_JWT: str(),
            PASS_ROUNDS: str(),
            MAIL: str(),
            MAIL_PASS: str(),
            CAPTCHA_SECRET: str()
        });
    }
}
