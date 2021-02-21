import { notFound } from '../helpers/http-helper'

export const endpointNotFound = (req, res, next) => {
  return notFound(res, 'Endpoint não encontrado')
}
