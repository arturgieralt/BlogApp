import { expect } from 'chai';
import { stubInterface } from 'ts-sinon';
import CaptchaService from './CaptchaService';
import { IEnvProvider } from 'providers/EnvProvider/IEnvProvider';
import { IAxios } from 'types/externals';
import forEach from 'mocha-each';

describe('Captcha service verifyToken method', () => {
    forEach([
        [true, 'localhost', true],
        [false, 'localhost', false],
        [true, 'localhost2', false],
        [false, 'localhost2', false]
    ]).it(
        'when success is %s and hostname is %s then returns %s',
        async (success, hostname, expectedResult) => {
            const testStub = stubInterface<IEnvProvider>({ get: 'secret' });
            const axiosStub = stubInterface<IAxios>({
                post: new Promise((res, rej) => {
                    res({
                        data: {
                            success,
                            hostname
                        }
                    });
                })
            });
            const captchaService = new CaptchaService(testStub, axiosStub);
            const result = await captchaService.verifyToken('token');
            expect(result).to.be.equal(expectedResult);
        }
    );
});
