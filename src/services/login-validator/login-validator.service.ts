import { LoginValidator } from '../../protocols/login-validator'
import validator from 'validator'
import PasswordValidator from 'password-validator'
export class LoginValidatorService implements LoginValidator {
  isValid (email: string, password: string): boolean {
    const validEmail = validator.isEmail(email)

    const passwordValidator = new PasswordValidator()
    passwordValidator.is().min(6).is().max(6).has().digits(6)
    const validPassword = !!passwordValidator.validate(password)

    return (validEmail && validPassword)
  }
}
