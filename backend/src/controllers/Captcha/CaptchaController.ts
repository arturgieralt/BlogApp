import { NextFunction, Response, Request } from "express";
import { ICaptchaService } from "../../services/Captcha/ICaptchaService";
import { ICaptchaController } from "./ICaptchaController";

export default class CaptchaController implements ICaptchaController {

    constructor(private CaptchaService: ICaptchaService) {

    }
    
    verifyToken = async (req: Request, res: Response, next: NextFunction) => {
      try{
          const isHuman = await this.CaptchaService.verifyToken(req.body.token);
          res.status(200).json(isHuman);
        } catch(e) {
         res.status(400).json(e);
        }
    };
  }

  