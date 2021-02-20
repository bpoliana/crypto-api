import { LoginValidator } from './login-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeLoginValidator = (): LoginValidator => {
  return new LoginValidator()
}
describe('LoginValidator Service', () => {
  test('Should return false if validator returns false', () => {
    const loginValidatorAdapter = makeLoginValidator()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = loginValidatorAdapter.isValid('invalid_mail@mail.com', '123456')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const loginValidatorAdapter = makeLoginValidator()
    const isValid = loginValidatorAdapter.isValid('valid_mail@mail.com', '123456')
    expect(isValid).toBe(true)
  })

  test('Should call validator with the same email', () => {
    const loginValidatorAdapter = makeLoginValidator()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    loginValidatorAdapter.isValid('any@mail.com', '123456')
    expect(isEmailSpy).toBeCalledWith('any@mail.com')
  })

  test('Should return false if password has less than 6 digits', () => {
    const loginValidatorAdapter = makeLoginValidator()
    const isValid = loginValidatorAdapter.isValid('invalid_mail@mail.com', '12345')
    expect(isValid).toBe(false)
  })

  test('Should return false if password has more than 6 digits', () => {
    const loginValidatorAdapter = makeLoginValidator()
    const isValid = loginValidatorAdapter.isValid('invalid_mail@mail.com', '12345678')
    expect(isValid).toBe(false)
  })

  test('Should return false if password has letters', () => {
    const loginValidatorAdapter = makeLoginValidator()
    const isValid = loginValidatorAdapter.isValid('invalid_mail@mail.com', 'lalala')
    expect(isValid).toBe(false)
  })
})
