import { Router } from 'express'
import AuthController from './controllers/auth/auth.controller'
import CurrencyController from './controllers/currency/currency.controller'

const routes = Router()

routes.post('/login', AuthController.login)

routes.get('/crypto/btc', CurrencyController.handle)

export { routes }
