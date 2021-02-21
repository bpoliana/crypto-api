import { Router } from 'express'
import AuthController from './controllers/auth/auth.controller'
import CurrencyController from './controllers/currency/currency.controller'
import { currencyValidations } from './middlewares/fields-validators'

const routes = Router()

routes.post('/login', AuthController.login)

routes.get('/crypto/btc', CurrencyController.getCurrencies)

routes.post('/crypto/btc', currencyValidations, CurrencyController.updateCurrencies)

export { routes }
