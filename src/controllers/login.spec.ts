import { LoginController } from './login'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', () => {
    const login = new LoginController()
    const request = {
      body: {
        password: 'password'
      }
    }
    const response = login.handle(request)
    expect(response).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', () => {
    const login = new LoginController()
    const request = {
      body: {
        email: 'somebody@email.com'
      }
    }
    const response = login.handle(request)
    expect(response).toEqual(badRequest(new MissingParamError('senha')))
  })
})
