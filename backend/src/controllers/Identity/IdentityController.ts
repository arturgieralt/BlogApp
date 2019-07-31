import { Request, Response, NextFunction } from 'express';
import { IAxios } from './../../types/externals';
import { IIdentityController } from './IIdentityController';

export default class IdentityController implements IIdentityController {
    public constructor(

        private axios: IAxios
    ) {}

    public verifyFacebookToken = async (req: Request, res: Response, next: NextFunction) => {

        const { token } = req.body;
        const appId = '2560506850634998';
        const secret = '4f132aa6e0ebb845c33df0870fef58fe'
        
        const response = await this.axios.get(`https://graph.facebook.com/debug_token?input_token=${token}&access_token=${appId}|${secret}`);
        const userData = await this.axios.get(`https://graph.facebook.com/${response.data.data.user_id}?fields=id,name,email,picture&access_token=${token}`);
        return res.json(userData.data);
    };
}
