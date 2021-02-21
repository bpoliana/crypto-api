import { Router } from 'express'
import AuthController from './controllers/auth/auth.controller'
import CurrencyController from './controllers/currency/currency.controller'
import { currencyValidations } from './middlewares/fields-validators'
import { checkJwt } from './middlewares/token-validator'

const routes = Router()

routes.post('/login', AuthController.login)

routes.get('/crypto/btc', checkJwt, CurrencyController.getCurrencies)

routes.post('/crypto/btc', checkJwt, currencyValidations, CurrencyController.updateCurrencies)

export { routes }
