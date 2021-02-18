import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { jwtSecret } from '../../config'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
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
      return res.status(400).send('login not valid')
    }

    const accessToken = jwt.sign(
      { email: email }, jwtSecret,
      { expiresIn: '1h' }
    )
    if (!accessToken) {
      return res.status(401).send('no valid token')
    }
    if (accessToken) {
      return res.status(200).send({ accessToken: accessToken })
    }
    next()
  }
}

export default new AuthController()
