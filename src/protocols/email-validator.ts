export interface EmailValidator {
  isValid: (email: string, password: string) => boolean
}
