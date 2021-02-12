export interface LoginValidator {
  isValid: (email: string, password: string) => boolean
}
