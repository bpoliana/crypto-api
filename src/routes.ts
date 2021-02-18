import { Router } from 'express'
import AuthController from './controllers/auth/auth.controller'

const routes = Router()

routes.post('/login', AuthController.login)

export { routes }
