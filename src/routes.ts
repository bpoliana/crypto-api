import { Router } from 'express'
import AuthController from './controllers/auth/auth.controller'
import CurrencyController from './controllers/currency/currency.controller'
import { check } from 'express-validator'

const routes = Router()

routes.post('/login', AuthController.login)

routes.get('/crypto/btc', CurrencyController.getCurrencies)

routes.post('/crypto/btc', [check('currency').isIn(['BRL', 'EUR', 'CAD']), check('value').isNumeric()], CurrencyController.updateCurrencies)

export { routes }
