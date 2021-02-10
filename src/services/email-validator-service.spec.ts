import { EmailValidatorService } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeEmailValidator = (): EmailValidatorService => {
  return new EmailValidatorService()
}
describe('EmailValidator Service', () => {
  test('Should return false if validator returns false', () => {
    const emailValidatorAdapter = makeEmailValidator()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = emailValidatorAdapter.isValid('invalid_mail@mail.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const emailValidatorAdapter = makeEmailValidator()
    const isValid = emailValidatorAdapter.isValid('valid_mail@mail.com')
    expect(isValid).toBe(true)
  })

  test('Should call validator with the same email', () => {
    const emailValidatorAdapter = makeEmailValidator()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    emailValidatorAdapter.isValid('any@mail.com')
    expect(isEmailSpy).toBeCalledWith('any@mail.com')
  })
})
