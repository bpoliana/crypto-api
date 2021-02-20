import mocks from 'node-mocks-http'
import AuthController from './auth.controller'

describe('Auth Controller', () => {
  test('Should call login with correct values', async () => {
    const { login } = AuthController
    const request = mocks.createRequest({
      body: { any_property: 'any_value' },
      params: { any_param: 'any_param' },
      headers: { any_param: 'any_param' },
      query: { any_param: 'any_param' }
    })
    const response = mocks.createResponse()
    const controllerStub = await AuthController.login(request, response)
    console.log(controllerStub)
    expect(controllerStub).toHaveBeenCalledWith({
      body: { any_property: 'any_value' },
      params: { any_param: 'any_param' },
      headers: { any_param: 'any_param' },
      query: { any_param: 'any_param' }
    })
  })

  // test('Should return 400 if no password is provided', async () => {
  //   const { login } = makeLogin()
  //   const request = {
  //     body: {
  //       email: 'somebody@email.com'
  //     }
  //   }
  //   const response = await login.handle(request)
  //   expect(response).toEqual(badRequest(new MissingParamError('password')))
  // })

  // test('Should return 400 if an invalid email is provided', async () => {
  //   const { login, loginValidatorStub } = makeLogin()
  //   jest.spyOn(loginValidatorStub, 'isValid').mockReturnValueOnce(false)
  //   const request = makeRequest()
  //   const response = await login.handle(request)
  //   expect(response).toEqual(badRequest(new InvalidParamError()))
  // })

  // test('Should return 500 if LoginValidator throws an error', async () => {
  //   const { login, loginValidatorStub } = makeLogin()
  //   jest.spyOn(loginValidatorStub, 'isValid').mockImplementationOnce(() => {
  //     throw new Error()
  //   })
  //   const request = makeRequest()

  //   const response = await login.handle(request)
  //   expect(response).toEqual(internalServerError(Error()))
  // })

  // test('Should call LoginValidator with a correct email', async () => {
  //   const { login, loginValidatorStub } = makeLogin()
  //   const isValidSpy = jest.spyOn(loginValidatorStub, 'isValid')
  //   const request = makeRequest()
  //   await login.handle(request)
  //   expect(isValidSpy).toBeCalledWith('anything@email.com', 'password')
  // })

  // test('Should call Authentication with correct values', async () => {
  //   const { login, authenticationStub } = makeLogin()
  //   const authSpy = jest.spyOn(authenticationStub, 'auth')
  //   const request = makeRequest()
  //   await login.handle(request)
  //   expect(authSpy).toHaveBeenCalledWith('anything@email.com', 'password')
  // })

  // test('Should return 401 if invalid credentials are provided', async () => {
  //   const { login, authenticationStub } = makeLogin()
  //   jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
  //   const response = await login.handle(makeRequest())
  //   expect(response).toEqual(unauthorized())
  // })

  // test('Should return 200 if valid credentials are provided', async () => {
  //   const { login } = makeLogin()
  //   const response = await login.handle(makeRequest())
  //   expect(response).toEqual(ok({ accessToken: 'token aqui' }))
  // })
})
