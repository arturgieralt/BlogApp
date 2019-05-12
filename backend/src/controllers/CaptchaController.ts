import CaptchaService from "./../services/CaptchaService";
import { NextFunction, Response, Request } from "express";

export  class CaptchaController {

    constructor(private CaptchaServiceInstance: CaptchaService) {

    }
    
    verifyToken = async (req: Request, res: Response, next: NextFunction) => {
      try{
          const isHuman = await this.CaptchaServiceInstance.verifyToken(req.body.token);
          res.status(200).json(isHuman);
        } catch(e) {
         res.status(400).json(e);
        }
    };
  }

export default new CaptchaController(new CaptchaService())
  