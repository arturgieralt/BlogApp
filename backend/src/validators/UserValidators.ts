import { body } from 'express-validator/check';

export class UserValidators {
    public static register = [
        body('name')
            .isAlphanumeric()
            .trim()
            .escape(),
        body('email')
            .isEmail()
            .normalizeEmail(),
        body('password').trim()
        // .matches(/^(?!.*(.)\1{3})((?=.*[\d])(?=.*[A-Za-z])|(?=.*[^\w\d\s])(?=.*[A-Za-z])).{8,20}$/) //8-20 chars; at least one alpha; at least one number or special char; up to 3 repeating chars, no more
    ];

    public static login = [
        body('email')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password').trim()
        //  .matches(/^(?!.*(.)\1{3})((?=.*[\d])(?=.*[A-Za-z])|(?=.*[^\w\d\s])(?=.*[A-Za-z])).{8,20}$/) //8-20 chars; at least one alpha; at least one number or special char; up to 3 repeating chars, no more
    ];

    public static verify = [
        body('token')
            .trim()
            .isString()
    ];
}
