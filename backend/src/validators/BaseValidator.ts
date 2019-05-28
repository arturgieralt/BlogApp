
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { UserValidators } from './UserValidators';

export class BaseValidator {
    static validatorHandler (req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        return next()
    }

    static getValidators(route: string) {
        switch(route) {
            case '/user/register':
                return UserValidators.register;
            case '/user/verify':
                return UserValidators.register;
            case '/user/login':
                return UserValidators.login;
            default:
                return []
        }
    }

    static get(route: string) {
        return [
            BaseValidator.getValidators(route), 
            BaseValidator.validatorHandler
        ];
    }

}