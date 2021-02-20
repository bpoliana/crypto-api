export interface ILoginValidator {
  isValid: (email: string, password: string) => boolean
}
