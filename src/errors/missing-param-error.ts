export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Faltando parametro: ${paramName}`)
  }
}
