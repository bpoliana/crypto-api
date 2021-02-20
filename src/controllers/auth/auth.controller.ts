import { Request, Response } from 'express'
import { jwtSecret } from '../../config'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { UnauthorizedError } from '../../errors/unauthorized-error'
import { badRequest, ok, unauthorized } from '../../helpers/http-helper'
import { AuthService } from '../../services/auth/auth.service'
import { LoginValidator } from '../validators/login-validator/login-validator'

class AuthController {
  async login (req: Request, res: Response) {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!req.body[field]) {
        const error = new MissingParamError(field)
        return badRequest(res, error)
      }
    }
    const { email, password } = req.body
    const loginValidator = new LoginValidator()
    const isValid = loginValidator.isValid(email, password)
    if (!isValid) {
      const error = new InvalidParamError()
      return badRequest(res, error)
    }

    const authService = new AuthService(jwtSecret)
    const accessToken = await authService.authenticate(email)
    if (!accessToken) {
      const error = new UnauthorizedError()
      return unauthorized(res, error)
    }
    return ok(res, accessToken)
  }
}

export default new AuthController()
