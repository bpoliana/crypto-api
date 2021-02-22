import { notFound } from '../helpers/http-helper'

export const endpointNotFound = (req, res, next) => {
  if (!req.route) {
    return next(notFound(res, 'Endpoint não encontrado'))
  }
}
