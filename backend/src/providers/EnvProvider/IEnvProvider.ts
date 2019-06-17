import { EnvVariables } from 'types/envVariables';

export interface IEnvProvider {
    get: (name: EnvVariables) => string;
}
