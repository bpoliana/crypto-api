import jwt from 'jsonwebtoken'
import { AuthService } from './auth.service'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  }
}))

describe('Auth Service', () => {
  test('Should call sign with correct values', async () => {
    const authService = new AuthService('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await authService.authenticate('any_value')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret', { expiresIn: '1h' })
  })
  test('Should return empty string if theres no accessToken', async () => {
    const authService = new AuthService('secret')
    const accessToken = await authService.authenticate('valid@mail.com')
    expect(accessToken).toBe('any_token')
  })

  test('Should throw if sign throws', async () => {
    const auth = new AuthService('secret')
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = auth.authenticate('any_email')
    await expect(promise).rejects.toThrow()
  })
})
