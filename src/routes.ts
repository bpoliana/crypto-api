import { Router } from 'express'
import AuthController from './controllers/auth/auth.controller'
import CoinDeskController from './controllers/coin-desk/coin-desk.controller'

const routes = Router()

routes.post('/login', AuthController.login)

routes.get('/crypto/btc', CoinDeskController.handle)

export { routes }
