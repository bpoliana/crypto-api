import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, internalServerError } from '../helpers/http-helper'
import { LoginValidator } from '../protocols/login-validator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/server-error'

export class LoginController {
  private readonly loginValidator: LoginValidator

  constructor (loginValidator: any) {
    this.loginValidator = loginValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.body.email) {
        return badRequest(new MissingParamError('email'))
      }
      if (!httpRequest.body.password) {
        return badRequest(new MissingParamError('senha'))
      }
      const isValid = this.loginValidator.isValid(httpRequest.body.email, httpRequest.body.password)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return internalServerError(new ServerError())
    }
  }
}
