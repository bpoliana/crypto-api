import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { jwtSecret } from '../../config'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { UnauthorizedError } from '../../errors/unauthorized-error'
import { badRequest, ok, unauthorized } from '../../helpers/http-helper'
import { LoginValidatorService } from '../../services/login-validator'

class AuthController {
  async login (req: Request, res: Response, next: NextFunction) {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!req.body[field]) {
        const error = new MissingParamError(field)
        return badRequest(res, error)
      }
    }
    const { email, password } = req.body
    const loginValidator = new LoginValidatorService()
    const isValid = loginValidator.isValid(email, password)
    if (!isValid) {
      const error = new InvalidParamError()
      return badRequest(res, error)
    }

    const accessToken = jwt.sign(
      { email: email }, jwtSecret,
      { expiresIn: '1h' }
    )
    if (!accessToken) {
      const error = new UnauthorizedError()
      return unauthorized(res, error)
    }
    if (accessToken) {
      return ok(res, accessToken)
    }
    next()
  }
}

export default new AuthController()
