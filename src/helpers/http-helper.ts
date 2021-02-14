import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors/server-error'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const internalServerError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}
