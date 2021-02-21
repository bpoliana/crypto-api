
import { check } from 'express-validator'

export const currencyValidations = [check('currency').isIn(['BRL', 'EUR', 'CAD']), check('value').isNumeric()]
