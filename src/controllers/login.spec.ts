import { LoginController } from './login'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { LoginValidator } from '../protocols/login-validator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/server-error'
import { Authentication } from '../protocols/authentication'
import { HttpRequest } from '../protocols/http'
interface factoryTypes {
  login: LoginController
  loginValidatorStub: LoginValidator
  authenticationStub: Authentication
}

const makeRequest = (): HttpRequest => ({
  body: {
    email: 'anything@email.com',
    password: 'password'
  }
})

const makeLogin = (): factoryTypes => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return await new Promise(resolve => resolve('token'))
    }
  }
  class LoginValidatorStub implements LoginValidator {
    isValid (email: string, password: string): boolean {
      return true
    }
  }
  const loginValidatorStub = new LoginValidatorStub()
  const authenticationStub = new AuthenticationStub()
  const login = new LoginController(loginValidatorStub, authenticationStub)
  return {
    login,
    loginValidatorStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { login } = makeLogin()
    const request = {
      body: {
        password: 'password'
      }
    }
    const response = await login.handle(request)
    expect(response).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { login } = makeLogin()
    const request = {
      body: {
        email: 'somebody@email.com'
      }
    }
    const response = await login.handle(request)
    expect(response).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { login, loginValidatorStub } = makeLogin()
    jest.spyOn(loginValidatorStub, 'isValid').mockReturnValueOnce(false)
    const request = makeRequest()
    const response = await login.handle(request)
    expect(response).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should return 500 if LoginValidator throws an error', async () => {
    const { login, loginValidatorStub } = makeLogin()
    jest.spyOn(loginValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const request = makeRequest()

    const response = await login.handle(request)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })

  test('Should call LoginValidator with a correct email', async () => {
    const { login, loginValidatorStub } = makeLogin()
    const isValidSpy = jest.spyOn(loginValidatorStub, 'isValid')
    const request = makeRequest()
    await login.handle(request)
    expect(isValidSpy).toBeCalledWith('anything@email.com', 'password')
  })

  test('Should call Authentication with correct values', async () => {
    const { login, authenticationStub } = makeLogin()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const request = makeRequest()
    await login.handle(request)
    expect(authSpy).toHaveBeenCalledWith('anything@email.com', 'password')
  })
})
