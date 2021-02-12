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
    const isValid = emailValidatorAdapter.isValid('invalid_mail@mail.com', '123456')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const emailValidatorAdapter = makeEmailValidator()
    const isValid = emailValidatorAdapter.isValid('valid_mail@mail.com', '123456')
    expect(isValid).toBe(true)
  })

  test('Should call validator with the same email', () => {
    const emailValidatorAdapter = makeEmailValidator()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    emailValidatorAdapter.isValid('any@mail.com', '123456')
    expect(isEmailSpy).toBeCalledWith('any@mail.com')
  })

  test('Should return false if password has less than 6 digits', () => {
    const emailValidatorAdapter = makeEmailValidator()
    const isValid = emailValidatorAdapter.isValid('invalid_mail@mail.com', '12345')
    expect(isValid).toBe(false)
  })

  test('Should return false if password has more than 6 digits', () => {
    const emailValidatorAdapter = makeEmailValidator()
    const isValid = emailValidatorAdapter.isValid('invalid_mail@mail.com', '12345678')
    expect(isValid).toBe(false)
  })

  test('Should return false if password has letters', () => {
    const emailValidatorAdapter = makeEmailValidator()
    const isValid = emailValidatorAdapter.isValid('invalid_mail@mail.com', 'lalala')
    expect(isValid).toBe(false)
  })
})
