import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { jwtSecret } from '../../config'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { badRequest, internalServerError, ok } from '../../helpers/http-helper'
import { AuthService } from '../../services/auth/auth.service'

class AuthController {
  async login (req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw new InvalidParamError('Campos inválidos')
      }
      const { email } = req.body
      const authService = new AuthService(jwtSecret)
      const accessToken = await authService.authenticate(email)
      return ok(res, { token: accessToken })
    } catch (err) {
      if (err instanceof InvalidParamError) {
        return badRequest(res, err)
      }
      return internalServerError(res, err)
    }
  }
}

export default new AuthController()
