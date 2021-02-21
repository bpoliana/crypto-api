
import { check } from 'express-validator'

export const currencyValidations = [check('currency').isIn(['BRL', 'EUR', 'CAD']), check('value').isNumeric()]

export const loginValidations = [check('email').isEmail(), check('password').isLength({ min: 6, max: 6 }).isNumeric()]
