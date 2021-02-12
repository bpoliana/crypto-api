import { LoginController } from './login'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { LoginValidator } from '../protocols/login-validator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/server-error'

interface factoryTypes {
  login: LoginController
  loginValidatorStub: LoginValidator
}

const makeLogin = (): factoryTypes => {
  class LoginValidatorStub implements LoginValidator {
    isValid (email: string, password: string): boolean {
      return true
    }
  }

  const loginValidatorStub = new LoginValidatorStub()
  const login = new LoginController(loginValidatorStub)
  return {
    login,
    loginValidatorStub
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
    const { login, loginValidatorStub } = makeLogin()
    jest.spyOn(loginValidatorStub, 'isValid').mockReturnValueOnce(false)
    const request = {
      body: {
        email: 'invalid@email.com',
        password: 'password'
      }
    }
    const response = login.handle(request)
    expect(response).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should return 500 if LoginValidator throws an error', () => {
    const { login, loginValidatorStub } = makeLogin()
    jest.spyOn(loginValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const request = {
      body: {
        email: 'invalid@email.com',
        password: 'password'
      }
    }

    const response = login.handle(request)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })

  test('Should call LoginValidator with a correct email', () => {
    const { login, loginValidatorStub } = makeLogin()
    const isValidSpy = jest.spyOn(loginValidatorStub, 'isValid')
    const request = {
      body: {
        email: 'anything@email.com',
        password: 'password'
      }
    }
    login.handle(request)
    expect(isValidSpy).toBeCalledWith('anything@email.com', 'password')
  })
})
