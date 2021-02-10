import { EmailValidatorService } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))
describe('EmailValidator Service', () => {
  test('Should return false if validator returns false', () => {
    const emailValidatorAdapter = new EmailValidatorService()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = emailValidatorAdapter.isValid('invalid_mail@mail.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const emailValidatorAdapter = new EmailValidatorService()
    const isValid = emailValidatorAdapter.isValid('valid_mail@mail.com')
    expect(isValid).toBe(true)
  })
})
