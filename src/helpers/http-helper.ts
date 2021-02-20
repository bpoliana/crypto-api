import { Response } from 'express'

export const badRequest = (res, error: Error): Response => {
  return res.status(400).send({ message: error.message })
}

export const unauthorized = (res, error: Error): Response => {
  return res.status(401).send({ message: error.message })
}

export const internalServerError = (res, error: Error): Response => {
  return res.status(500).send({ message: error.message })
}

export const ok = (res, data: any): Response => {
  return res.status(200).send({ data })
}
