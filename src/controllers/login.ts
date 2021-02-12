import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, internalServerError } from '../helpers/http-helper'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/server-error'

export class LoginController {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: any) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.body.email) {
        return badRequest(new MissingParamError('email'))
      }
      if (!httpRequest.body.password) {
        return badRequest(new MissingParamError('senha'))
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return internalServerError(new ServerError())
    }
  }
}
