export class UnauthorizedError extends Error {
  constructor () {
    super('Token inválido')
    this.name = 'UnauthorizedError'
  }
}
