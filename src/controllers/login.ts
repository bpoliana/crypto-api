import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, internalServerError } from '../helpers/http-helper'
import { LoginValidator } from '../protocols/login-validator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/server-error'
import { Authentication } from '../protocols/authentication'

export class LoginController {
  private readonly loginValidator: LoginValidator
  private readonly authentication: Authentication

  constructor (loginValidator: LoginValidator, authentication: Authentication) {
    this.loginValidator = loginValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.loginValidator.isValid(email, password)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      await this.authentication.auth(email, password)
    } catch (error) {
      return internalServerError(new ServerError())
    }
  }
}
