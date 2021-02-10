import { LoginController } from './login'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/server-error'

interface factoryTypes {
  login: LoginController
  emailValidatorStub: EmailValidator
}

const makeLogin = (): factoryTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()
  const login = new LoginController(emailValidatorStub)
  return {
    login,
    emailValidatorStub
  }
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', () => {
    const { login } = makeLogin()
    const request = {
      body: {
        password: 'password'
      }
    }
    const response = login.handle(request)
    expect(response).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', () => {
    const { login } = makeLogin()
    const request = {
      body: {
        email: 'somebody@email.com'
      }
    }
    const response = login.handle(request)
    expect(response).toEqual(badRequest(new MissingParamError('senha')))
  })

  test('Should return 400 if an invalid email is provided', () => {
    const { login, emailValidatorStub } = makeLogin()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const request = {
      body: {
        email: 'invalid@email.com',
        password: 'password'
      }
    }
    const response = login.handle(request)
    expect(response).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should return 500 if EmailValidator throws an Exception', () => {
    class EmailValidatorStub implements EmailValidator {
      isValid (email: string): boolean {
        throw new Error()
      }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const login = new LoginController(emailValidatorStub)

    const request = {
      body: {
        email: 'any@email.com',
        password: 'password'
      }
    }

    const response = login.handle(request)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })
})
