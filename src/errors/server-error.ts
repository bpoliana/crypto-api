export class ServerError extends Error {
  constructor (stack: string) {
    super('Houve um erro inesperado no servidor :(')
    this.name = 'ServerError'
    this.stack = stack
  }
}
