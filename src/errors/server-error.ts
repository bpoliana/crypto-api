export class ServerError extends Error {
  constructor () {
    super('Houve um erro inesperado no servidor :(')
  }
}
